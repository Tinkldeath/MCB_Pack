const express = require('express');
const controller = require('./../controllers/adminsController');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// localhost:port/api/admin/login
router.post('/login',controller.login);
// localhost:port/api/admin/add
router.post('/add',controller.add);

module.exports = router;