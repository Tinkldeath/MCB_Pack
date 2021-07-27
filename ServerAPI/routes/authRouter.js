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

module.exports = router;