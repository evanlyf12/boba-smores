const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();
const controller = require('../controllers/controller.js');

// Home route (van landing with splash)
router.get('/', controller.test);

router.post('/create_account', controller.createAccount);

router.post('/delete_contact', controller.deleteContact);

router.post('/add_contact', controller.addContact);

router.post('/add_tag', controller.addTagToContact);

router.post('/update_contact', controller.updateContact);

router.post('/get_contact/:id', controller.getContact);

router.post('/v1/auth/google', controller.authenticateUser);

module.exports = router