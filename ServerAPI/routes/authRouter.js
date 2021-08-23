const express = require('express');
const controller = require('./../controllers/authController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');
const passport = require('passport');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/login',controller.login);
//localhost:port/api/auth/login

router.post('/register',controller.register);
//localhost:port/api/auth/register

router.patch('/changePassword',passport.authenticate('jwt',{session: false}),controller.changePassword);
//localhost:port/api/auth/changePassword

router.patch('/changeLogin',passport.authenticate('jwt',{session: false}),controller.changeLogin);
//localhost:port/api/auth/changeLogin

module.exports = router;