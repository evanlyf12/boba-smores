// Importing all required files & libraries
const express = require('express')
const app = express() 
const session = require('express-session');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const MongoDBSession = require('connect-mongodb-session')(session);
const path = require('path')

const router = require('../routes/router')

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../views')));
app.use(express.static(path.join(__dirname, '../public')));


const {MongoClient} = require('../db/db.js');

app.use('/', router)

app.listen(port, () => {
    console.log(`server is listening on port`, port)
})


// Exports app for testing
module.exports = app