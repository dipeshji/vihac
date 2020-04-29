const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./utils/db');

const port = process.env.port;

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`server running on localhost:${port}`);

})
