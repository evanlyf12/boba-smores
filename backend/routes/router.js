const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();
const controller = require('../controllers/controller.js');

// Home route (van landing with splash)
router.get('/', controller.test);

router.post('/create_account', controller.createAccount);

router.post('/delete_contact/:contactId/:userId', controller.deleteContact);

router.post('/add_contact/:id', controller.addContact);

router.post('/add_tag', controller.addTagToContact);

router.post('/update_contact/:id', controller.updateContact);

router.post('/v1/auth/google', controller.authenticateUser);

router.get('/get_contacts/:id', controller.getContacts)

module.exports = router