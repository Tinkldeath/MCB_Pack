const express = require('express');
const controller = require('./../controllers/subjectController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/all',controller.GetAll);
//localhost:port/api/subject/all

router.get('/',controller.GetById);
//localhost:port/api/subject/

router.post('/create',controller.Create);
//localhost:port/api/subject/create

router.patch('/update',controller.Update);
//localhost:port/api/subject/update

router.delete('/delete',controller.Delete);
//localhost:port/api/subject/delete


module.exports = router;