const express = require('express');
const controller = require('./../controllers/subjectController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');
const passport = require('passport');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/all',controller.GetAll);
//localhost:port/api/subjects/all

router.get('/',controller.GetById);
//localhost:port/api/subjects/

router.post('/add',passport.authenticate('jwt',{session: false}),controller.Create);
//localhost:port/api/subjects/create

router.patch('/update',passport.authenticate('jwt',{session: false}),controller.Update);
//localhost:port/api/subjects/update

router.delete('/delete/:id',passport.authenticate('jwt',{session: false}),controller.Delete);
//localhost:port/api/subjects/delete


module.exports = router;