const express = require('express');
const {register} = require('../controllers/userController');
const { accomodate } = require('../controllers/accomodationFormController');
const router = express.Router();

router.post('/register', register);
router.post('/accomodate', accomodate);

module.exports = router;
