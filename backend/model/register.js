// const db = require('../utils/db');
const unirest = require('unirest');
const Regex = require('regex');

module.exports.registerUser = (user) => {

}

async function getuseraddress(pinCode, cb) {
    await getuseraadr(pinCode)
        .then(address => {
            let state = [];
            let town = [];
            // regToGetTown = /\s([A-Z | a-z][.])+[A-Z|a-z]?[.]?/;
            // address.filter((element) => {
            //     town.push(element.office.replace(regToGetTown,''));
            //     state.push(element.circle); 
            // })
            // cb({state,town}, null);
            address.filter(element => {
                element["PostOffice"].filter(element => {
                    town.push(element.Name);
                    state.push(element.Circle);
                });
            });
            state = [...new Set(state)];

            cb(null, { state, town });
        }).catch(err => {
            console.log(err);
            
            cb(err, null);
        });
};


getuseraadr = ((pinCode) => {
    console.log(pinCode);

    // var req = unirest("POST", "https://api.postalpincode.in/pincode/451221");
    // req.headers({});
    var req = unirest("GET", `https://api.postalpincode.in/pincode/${pinCode}`);


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

    // req.type("json");
    // req.send({
    //     "searchBy": "pincode",
    //     "value": pinCode
    // });


    return new Promise((resolve, reject) => {
        req.end(res => {
            if (res.body[0].Message !== "No records found") resolve(res.body);
            else reject({ "code": 404, "msg": "No data available. Might be pincode is wrong, please check and retry" });
        })
    });
});

module.exports.getuseraddress = getuseraddress;