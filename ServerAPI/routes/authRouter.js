const express = require('express');
const controller = require('./../controllers/authController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/login',controller.login);
//localhost:port/api/auth/login

router.post('/register',controller.register);
//localhost:port/api/auth/register

router.post('/changePassword',controller.changePassword);
//localhost:port/api/auth/changePassword

router.post('/changeLogin',controller.changeLogin);
//localhost:port/api/auth/changeLogin

module.exports = router;