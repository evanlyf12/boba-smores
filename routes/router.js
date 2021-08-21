const express = require('express')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router()
const controller = require('../controllers/controller.js')

// Home route, probably needs to be replaced with login
router.get('/', controller.test)

// A login form 
router.get('/login', controller.logIn)

// Sends the data for a new account
router.post('/create_account', controller.createAccount)

// Sends the data for a login
router.post('/check_login', controller.checkLogIn)

// Shows the client they have logged in
router.get('/logged_in', controller.loggedIn)

module.exports = router