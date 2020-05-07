const express = require('express');
const router = express.Router();
const register = require('../model/register');

router.get('/registeruser', (req, res) => {

});

router.get('/useraddress', (req, res) => {
    let pinCode = req.query.pinCode;
    
    register.getuseraddress(pinCode,(err,address)=>{
        if(!err) res.json({address, "status": 200});
        else res.json(err);
    });
})

module.exports = router;