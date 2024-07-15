const mysql = require('mysql2');
import config from '../database/config';
const pool = mysql.createPool(config);

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const checkIfUserExists = async (email: string) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from users WHERE email = ?', [email], (err: Error, results: User[]) => {
            if(err) {
                reject(err)
            }

            return results.length > 0 ? resolve(results[0]) : resolve(null)
        })
    })
}

export default checkIfUserExists;
