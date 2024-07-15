const mysql = require('mysql2');
import config from './config';

const connectToDB = () => {
    const connection = mysql.createConnection(config);
    connection.connect((err: Error) => {
        if (err) {
            console.error('Error connecting to DB: ', err.message);
            console.error('Error details: ', err);
            return;
        }
        console.log('Connected to DB');
    });
    return connection;
}

export default connectToDB;



