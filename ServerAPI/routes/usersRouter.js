const express = require('express');
const controller = require('./../controllers/usersController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');
const passport = require('passport');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/all',passport.authenticate('jwt',{session: false}),controller.GetAll);
//localhost:port/api/users/all

router.patch('/update',passport.authenticate('jwt',{session: false}),controller.Update);
//localhost:port/api/users/update

router.delete('/delete/:id',passport.authenticate('jwt',{session: false}),controller.Delete);
//localhost:port/api/users/delete/:id


module.exports = router;