// Importing all required files & libraries
const express = require('express')
const app = express() 
const session = require('express-session');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const MongoDBSession = require('connect-mongodb-session')(session);
const path = require('path')

const router = require('./routes/router')

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

const frontendStatic = express.static(path.join(__dirname, '../web/build'));
app.use(frontendStatic);

const {MongoClient} = require('./db/db.js');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    // cookie lasts for 30 days
    cookie: { maxAge: 60000 * 60 * 24 * 30 },
}));

app.use('/api', router)
// // and send all other requests to frontend built stuff
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../web/public', 'index.html'));
});

app.listen(port, () => {
    console.log(`server is listening on port`, port)
})


// Exports app for testing
module.exports = app