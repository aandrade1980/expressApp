var express = require('express');
var router = express.Router();

const landing = require('../controllers/landing');

/* GET home page. */
router.get('/', landing.get_landing);
router.get('/leads', landing.show_leads);
router.get('/lead/:lead_id', landing.show_lead);

router.post('/', landing.submit_lead);

module.exports = router;
