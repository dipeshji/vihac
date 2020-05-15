const dataBase = require('mssql');

const dbConfig = {
    user: process.env.user,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database,
    parseJSON: true,
    "options": {
        "enableArithAbort": true,
        encrypt: true
    },
};

const poolPromise = new dataBase.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log(`Database connected successfuly to ${process.env.server}@${process.env.user}`)
        return pool
    }).catch(err => {
        console.log(`Database connection to ${process.env.server}@${process.env.user} failed`);

    });

module.exports = {
    dataBase, poolPromise
}
// module.exports.Connect = dataBase.connect(dbConfig, err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`Connected to database: ${dbConfig.user}@${dbConfig.server}`);

//     }
// })

