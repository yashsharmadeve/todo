const router = require('express').Router();
const con = require('../database/config');
const phpUnserialize = require('phpunserialize');
const serialize = require('php-serialize').serialize;

router.post('/', (req, res) => {
    con.query('select * from wp_sj84j7_leads_form where uid = ?', [req.body.uid], (err, result) => {
        if (err) {
            // console.log(err);
            res.status(500).send('Database query error');
        } else {
            res.send(result);
            // console.log(result);
        }
    })
})

function generateNumericId(length) {
    const min = Math.pow(10, length - 1); // Minimum number with 'length' digits
    const max = Math.pow(10, length) - 1; // Maximum number with 'length' digits
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString();
}

function conv(data) {
    let da = Object.entries(data).map(([name, value]) => {
        return {
            name: name,
            values: [value]
        };
    });
    return da;
}

router.get('/:formid', (req, res) => {
    const formId = req.params.formid;
    con.query('SELECT * FROM wp_sj84j7_leads WHERE form_id = ?', [formId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send('Database query error');
        } else {
            const unresult = results.map((item) => {
                const newItem = {...item };
                newItem.field_data = phpUnserialize(item.field_data);
                return newItem;
            });

            const transformedResults = unresult.map((item) => {
                const newItem = {...item };
                newItem.field_data = item.field_data.reduce((acc, field) => {
                    acc[field.name] = field.values[0];
                    return acc;
                }, {});
                return newItem;
            });

            res.send(transformedResults);
        }
    });
});

router.post('/add-lead', (req, res) => {
    const { name, mobile, city, email, platform, added_by, updated_by, notes = null, status, ...extra_value } = req.body.data;
    const lead_id = generateNumericId(15);

    let sr;
    if (Object.keys(extra_value).length > 0) {
        try {
            let da = conv({ name, mobile, city, email, ...extra_value });
            sr = serialize(da);
        } catch (error) {
            console.error('Serialization error:', error);
            return res.status(500).send('Serialization error');
        }
    } else {
        try {
            let da = conv({ name, mobile, city, email });
            sr = serialize(da);
        } catch (error) {
            console.error('Serialization error:', error);
            return res.status(500).send('Serialization error');
        }
    }

    const sql = 'INSERT INTO wp_sj84j7_leads (lead_id ,field_data, platform, status, notes, added_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, [lead_id, sr, platform, status, notes, added_by, updated_by], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error');
        }
        // console.log('Inserted successfully:', result);
        res.send('successfull');
    });
});

router.post('/all-lead', (req, res) => {
    const query = `
    SELECT l.*
    FROM wp_sj84j7_leads l
    LEFT JOIN wp_sj84j7_leads_form lf ON l.form_id = lf.form_id
    LEFT JOIN wp_sj84j7_users u ON l.added_by = u.ID
    WHERE lf.uid = ?
      OR u.added_by IN (?, ?, ?)
  `;
    con.query(query, [req.body.uid, req.body.uid, req.body.u1, req.body.u2], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error');
        }
        const unresult = result.map((item) => {
            const newItem = {...item };
            newItem.field_data = phpUnserialize(item.field_data);
            return newItem;
        });

        const transformedResults = unresult.map((item) => {
            const newItem = {...item };
            if (newItem.field_data && Array.isArray(newItem.field_data)) {
                newItem.field_data = newItem.field_data.reduce((acc, field) => {
                    if (field && field.name && field.values && Array.isArray(field.values) && field.values.length > 0) {
                        acc[field.name] = field.values[0];
                    }
                    return acc;
                }, {});
            }
            return newItem;
        });
        res.status(200).send(transformedResults);
    })
})

module.exports = router;