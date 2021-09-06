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
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
express.json();
express.urlencoded();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(express.static(path.join(__dirname, '../views')));
app.use(express.static(path.join(__dirname, '../public')));


const {MongoClient} = require('../db/db.js');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    // cookie lasts for 2 weeks
    cookie: { maxAge: 60000 * 60 * 24 * 7 * 2 },
}));

app.use('/', router)

app.listen(port, () => {
    console.log(`server is listening on port`, port)
})


// Exports app for testing
module.exports = app