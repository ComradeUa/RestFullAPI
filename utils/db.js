const mysql = require('mysql')
const config = require('./config')

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    database: config.DBNANE,
})

connection.connect((error)=>{
    if(error)
    {
        return console.log('Error conection!', error)
    }
    else
    {
        return console.log('Database connection successful!')
    }
})

module.exports = connection