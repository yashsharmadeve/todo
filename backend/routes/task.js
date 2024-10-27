const router = require('express').Router();
const con = require('../database/config');

router.get('/', (req, res) => {
    con.query('select * from todo', (err, result) => {
        if (err) {
            res.status(500).send('Database query error');
        } else {
            res.send(result);
        }
    })
})
router.post('/add', (req, res) => {
    const { name, status = 0, priority = 0 } = req.body;
    const sql = 'INSERT INTO todo (name ,task, priority) VALUES (?, ?, ?)';
    con.query(sql, [name, status, priority], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error');
        }
        res.json('successfull');
    })
})

router.post('/delete', (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM todo WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error');
        }
        res.json('successfull');
    })
})


module.exports = router;