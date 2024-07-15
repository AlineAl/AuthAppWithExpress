const mysql = require('mysql2');
import config from './config';
const pool = mysql.createPool(config);

const createUserTable = () => {
    pool.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))', (err: Error) => {
        if (err) {
            console.error('Error creating table: ', err.message);
            console.error('Error details: ', err);
            return;
        }
        console.log('Table created');
    });
}

export default createUserTable;