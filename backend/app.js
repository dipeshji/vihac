const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var registerUser = require('./route/register');

app.use('/registerUser', registerUser);

app.listen(process.env.port, () => {
    console.log(`server running on localhost:${process.env.port}`);

})
