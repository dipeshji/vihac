const express = require('express');
const router = express.Router();
const multer = require('multer')
const register = require('../model/register');
const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../profileImages/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".jpg")
    }
});

const upload = multer({ storage: storage }).single('userImage');

router.post('/register', upload, (req, res) => {
    let user = { "body": req.body, "userImg": req.file.filename };
    // register.registerUser(user);
    if (register.registerUser(user)) {
        register.stored(user);
    }
    res.json(true)
});

router.get('/useraddress', (req, res) => {
    let pinCode = req.query.pinCode;

    register.getuseraddress(pinCode, (err, address) => {
        if (!err) res.json({ address, "status": 200 });
        else res.json(err);
    });
})

module.exports = router;