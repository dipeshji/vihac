const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================db connection====================
let dbCredentials = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}

const connection = mysql.createConnection(dbCredentials);

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
// =======================================================

app.listen(process.env.port, () => {
    console.log(`server running on localhost:${process.env.port}`);

})
