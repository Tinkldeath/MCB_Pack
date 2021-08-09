const express = require('express');
const controller = require('./../controllers/usersController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/all',controller.GetAll);
//localhost:port/api/users/all

router.delete('/delete/:id',controller.Delete);
//localhost:port/api/users/delete/:id


module.exports = router;