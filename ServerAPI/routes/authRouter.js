const express = require('express');
const controller = require('./../controllers/authController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/login',controller.login);

router.post('/register',controller.register);


module.exports = router;