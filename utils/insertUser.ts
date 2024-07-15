const mysql = require('mysql2');
import config from '../database/config';
const pool = mysql.createPool(config);

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const insertUser = async (name: string, email: string, password: string) => {
    new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err: Error, results: User[]) => {
            if(err) {
                reject(err)
            }
            resolve(results);
        })
    })
}

export default insertUser;



