const db = require('mssql');
const unirest = require('unirest');
const { poolPromise } = require('../utils/db');
const fs = require('fs');
const path = require('path');

async function registerUser(user) {
    console.log(user);
    try {
        const pool = await poolPromise;
        const transection = new db.Transaction(pool);

        transection.begin(err => {
            if (err) console.log(`transection error ${err}`);
            let rolledBack = false;
            transection.on('rollback', aborted => {
                console.log(aborted);
                rolledBack = true;
            })
            const request = new db.Request(transection);
            let profilepic = fs.readFileSync(path.join(__dirname, `../profileImages/${user.userImg}`));

            request.input('firstName', user.body.firstName);
            request.input('lastName', user.body.lastName);
            request.input('middleName', user.body.middleName);
            request.input('dob', db.Date(), user.body.dob);
            request.input('gender', user.body.gender);
            request.input('status', user.body.status);
            request.input('bloodGroup', user.body.bloodGroup);
            request.input('address', user.body.address);
            request.input('city', user.body.nameOfctv);
            request.input('state', user.body.state);
            request.input('countery', 'India');
            request.input('pincode', user.body.pinCode);
            request.input('mobile', user.body.mobileNumber);
            request.input('email', user.body.emailId);
            request.input('highestedu', user.body.highestEducation);
            request.input('occuption', user.body.occupation);
            request.input('occdetails', user.body.pleaseAddDetails);
            request.input('income', user.body.income);
            request.input('profilepic', db.VarBinary(), profilepic);


            // let stagingQuery = "insert into DWR_VTS_T.dbo.STAGING (FIRST_NAME, LAST_NAME, FATHERS_FIRST_NAME, DATE_OF_BIRTH, GENDER, MARITAL_STATUS, BLOOD_GROUP, Full_Address, City, State, Country, PINCODE, MOBILE, EMAIL, HIGHEST_EDU, OCCUPATION,OCP_DETAILS, INCOME, DISPLAY_PIC) values (@firstName, @lastName, @middleName, @dob, @gender, @status, @bloodGroup, @address, @city, @state, @countery, @pincode, @mobile, @email, @highestedu, @occuption, @occdetails, @income, @profilepic); SELECT @@identity"
            // console.log(request);

            request.execute('dbo._insert').then(result => {
                // console.log(result);
                // request.query(`select * from dbo.STAGING`, (err, result) => {
                //     console.log(err);
                //     console.log(result);
                // })
                transection.commit(err => {
                    if (err) console.log(err);
                    else {
                        console.log("commited");
                        return true;
                    }
                })
            }).catch(err => {
                console.log(err);
                transection.rollback(err=>{
                    if(err) console.log(`rollback error ${err}`);
                    else {
                        console.log("rolledBack");
                        return false;
                    }
                })

            })
            // request.query(stagingQuery, (err, result) => {
            //     if (err) console.log(err);
            //     else {
            //         console.dir(result);

            //         // request.on('done', function (result) {
            //         //     // console.log('New id: %d', columns[0].value);
            //         //     console.log(result);

            //         // });
            //         // request.query(`select * from STAGING`, (err, result)=>{
            //         //     console.log(err);
            //         //     console.log(result);


            //         // })
            //         const request = new db.Request(transection);

            //         request.input('firstName', user.body.firstName)
            //         request.input('middleName', user.body.middleName)
            //         request.input('lastName', user.body.lastName)
            //         request.input('dateOfBirth', user.body.dob)

            //         request.execute('dbo._keymemberid', (err, result) => {
            //             if (err) console.log(err);
            //             console.log(result);
            //         })
            //         pool.close();
            //     }
            // })
        })
    } catch (err) {
        console.log(`query error ${err}`);

    }
}

module.exports.stored = async function stored(user) {
    const pool = await poolPromise;
    const transection = new db.Transaction(pool);
    await transection.begin();
    const request = new db.Request(transection);
    // request.query(`select FIRST_NAME from dbo.STAGING`, (err, result) => {
    //     console.log(err);
    //     console.log(result);
    // })
    request.input('firstName', user.body.firstName);
    request.input('middleName', user.body.middleName);
    request.input('lastName', user.body.lastName);
    request.input('dateOfBirth', db.Date(), user.body.dob);
    // console.log(request);`

    // request.execute('dbo._keymemberid', (err, result) => {
    //     if (err) console.log(err);
    //     console.log(result);
    // })
    try {
        request.execute('dbo._keymemberid').then(result => {
            console.log(`keymember ${result}`);
            transection.commit(err => {
                if (err) console.log(err);
                else console.log("commited");
            });
        }).catch(err => {
            console.log(err);
            transection.rollback(err => {
                if (err) console.log(err);
                else console.log("rolledback");
            })
        })
    } catch (err) {
        console.log(err);

    }
}

async function getuseraddress(pinCode, cb) {
    await getuseraadr(pinCode)
        .then(address => {
            let state = [];
            let town = [];
            address.filter(element => {
                element["PostOffice"].filter(element => {
                    town.push(element.Name);
                    state.push(element.Circle);
                });
            });
            state = [...new Set(state)]; //Remove Duplicates
            cb(null, { state, town });
        }).catch(err => {
            console.log(err);

            cb(err, null);
        });
};


getuseraadr = ((pinCode) => {
    console.log(pinCode);
    var req = unirest("GET", `https://api.postalpincode.in/pincode/${pinCode}`);

    req.headers({
        "content-type": "application/json",
        "accept": "application/json"
    });

    return new Promise((resolve, reject) => {
        req.end(res => {
            if (res.body[0].Message !== "No records found") resolve(res.body);
            else reject({ "code": 404, "msg": "No data available. Might be pincode is wrong, please check and retry" });
        })
    });
});

module.exports.getuseraddress = getuseraddress;
module.exports.registerUser = registerUser;