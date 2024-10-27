const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config();

// const con = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     connectTimeout: 10
// });

const con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


// pool.connect((err) => {
//     if (err) console.log(err);
//     else console.log('connected');
// })
con.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting MySQL connection:', err);
        return;
    }else console.log('connected');

    // connection.query('SELECT * FROM todo', (error, results) => {
    //     connection.release(); // Release the connection back to the pool

    //     if (error) {
    //         console.error('Error executing query:', error);
    //         return;
    //     }

    //     console.log('Results:', results);
    // });
});

module.exports = con;