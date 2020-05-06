const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const db = require('./utils/db');
// const unirest = require('unirest');


var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var registerUser = require('./route/register');

app.use('/registerUser', registerUser);

// var req = unirest("POST", "https://pincode.p.rapidapi.com/");

//     req.headers({
//         "x-rapidapi-host": "pincode.p.rapidapi.com",
//         "x-rapidapi-key": "a1491ce288msh6c497231e950a44p17069fjsn57b0a5df2da3",
//         "content-type": "application/json",
// 		"accept": "application/json",
// 		"Retry-After": "3600"
// 	});
	
// 	console.log(req.headers);
	

//     req.type("json");
//     req.send({
//         "searchBy": "pincode",
//         "value": 452001
//     });
    

//     req.end(function (res) {
//         // if (res.error) return { "code": 404, "msg": "no data available" };
//         if (res.error) throw new Error(res.error);
//         else console.log(res.body);
//     });

app.listen(process.env.port, () => {
    console.log(`server running on localhost:${process.env.port}`);

})
