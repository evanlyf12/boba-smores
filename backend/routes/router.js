const express = require('express')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router()
const controller = require('../controllers/controller.js')

// Home route (van landing with splash)
router.get('/', controller.test)

router.post('/create_account', controller.createAccount)

router.get('/logged_in', controller.loggedIn)

module.exports = router