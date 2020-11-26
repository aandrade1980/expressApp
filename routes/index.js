var express = require('express');
var router = express.Router();

const landing = require('../controllers/landing');
const user = require('../controllers/user');

/* USER - GETS */
router.get('/login', user.show_login);
router.get('/signup', user.show_signup);

/* USER - POSTS */
router.post('/signup', user.signup);

/* GET home page. */
router.get('/', landing.get_landing);

/* LEADS - GETS */
router.get('/leads', landing.show_leads);
router.get('/lead/:lead_id', landing.show_lead);
router.get('/lead/:lead_id/edit', landing.show_edit_lead);

/* LEADS - POSTS */
router.post('/', landing.submit_lead);
router.post('/lead/:lead_id/edit', landing.edit_lead);
router.post('/lead/:lead_id/delete', landing.delete_lead);
router.post('/lead/:lead_id/delete-json', landing.delete_lead_json);

module.exports = router;
