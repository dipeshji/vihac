// const db = require('../utils/db');
const unirest = require('unirest');
const Regex = require('regex');

module.exports.registerUser = (user) => {

}

async function getuseraddress(pinCode, cb) {
    await getuseraadr(pinCode)
        .then(address => {
            // let state = [];
            // let town = [];
            // regToGetTown = /\s([A-Z | a-z][.])+[A-Z|a-z]?[.]?/;
            // address.filter((element) => {
            //     town.push(element.office.replace(regToGetTown,''));
            //     state.push(element.circle); 
            // })
            // cb({state,town}, null);
            cb(null,address)
        }).catch(err => {
            cb(err, null);
        })
}


getuseraadr = ((pinCode) => {
    console.log(pinCode);

    var req = unirest("POST", "https://api.postalpincode.in/pincode/451221");
    req.headers({});

    // req.headers({
    //     "x-rapidapi-host": "pincode.p.rapidapi.com",
    //     "x-rapidapi-key": process.env.rapidAPIkey,
    //     "content-type": "application/json",
    //     "accept": "application/json"
    // });

    req.headers({
        "content-type": "application/json",
        "accept": "application/json"
    });

    req.type("json");
    req.send({
        "searchBy": "pincode",
        "value": pinCode
    });


    return new Promise((resolve, reject) => {
        req.end(res => {

            if (!res.error) resolve(res.body);
            else {reject({ "code": res.status, "msg": res.error });console.log(res.error)}
        })
    });
});

module.exports.getuseraddress = getuseraddress;