const express = require('express');
const controller = require('./../controllers/specialsController');
const router = express.Router();
const bodyParser = require('../node_modules/body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// localhost:port/api/specials
router.get('/',controller.getSpecials);
// localhost:port/api/specials/:id
router.get('/:id',controller.getSpecialById);
//localhost:port/api/specials/:id
router.delete('/delete/:id',controller.deleteSpecialById);
//localhost:port/api/specials/add
router.post('/add',controller.addSpecial);
//localhost:port/api/specials
router.patch('/update/:id',controller.udpateSpecialById);


module.exports = router;