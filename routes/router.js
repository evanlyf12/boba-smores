const express = require('express')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router()
const controller = require('../controllers/controller.js')

// Home route (van landing with splash)
router.get('/', controller.test)
router.get('/login', controller.logIn)

router.post('/create_account', controller.createAccount)
router.post('/check_login', controller.checkLogIn)

router.get('/logged_in', controller.loggedIn)

module.exports = router