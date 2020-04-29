const mysql = require('mysql');

const dbCredentials={
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}

const dbConnection = mysql.createConnection(dbCredentials);


dbConnection.connect((err) => {

    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database connected as id ' + dbConnection.threadId);
});

module.exports.dbConnection;

