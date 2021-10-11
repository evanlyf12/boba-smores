const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();
const controller = require('../controllers/controller.js');

const fs = require('fs');

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

// Home route (van landing with splash)
router.get('/', controller.test);

router.post('/image', upload.single('image'), controller.image)

router.post('/create_account', controller.createAccount);

router.post('/delete_contact/:contactId/:userId', controller.deleteContact);

router.post('/add_contact/:id', upload.single('image'), controller.addContact);

router.post('/create_tag/:userId/:contactId', controller.createTag);

router.post('/delete_tag/:userId/:tagId', controller.deleteTag);

router.post('/add_tag/:contactId/:tagId', controller.addTagToContact);

router.post('/remove_tag/:contactId/:tagId', controller.removeTagFromContact);

router.post('/update_contact/:id', controller.updateContact);

router.post('/v1/auth/google', controller.authenticateUser);

router.get('/get_contacts/:id', controller.getContacts);

router.get('/get_tags/:id', controller.getTags);

router.get('/get_com_interests/:id', controller.getComInterests);

router.get('/view_images', controller.viewImages);

module.exports = router