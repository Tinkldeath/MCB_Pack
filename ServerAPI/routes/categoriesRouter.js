const express = require('express');
const controller = require('./../controllers/categoriesController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');
const passport = require('passport');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//localhost:4000/api/categories/all
router.get('/all',controller.getAll);

//localhost:4000/api/categories/add
router.post('/add',passport.authenticate('jwt',{session: false}),controller.addCategory);

//localhost:4000/api/categories/remove
router.delete('/delete/:id',passport.authenticate('jwt',{session: false}),controller.removeCategory);

//localhost:4000/api/categories/update
router.patch('/update',passport.authenticate('jwt',{session: false}),controller.updateCategory);


module.exports = router;