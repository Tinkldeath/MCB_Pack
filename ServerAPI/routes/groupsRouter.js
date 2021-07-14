const express = require('express');
const controller = require('./../controllers/groupsController');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/:specId',controller.getAllGroups)
// localhost:port/api/groups/:specId
router.post('/:specId',controller.getGroupsWithCourseNumber);
// localhost:port/api/groups/:id
router.get('/:id',controller.getGroupById);
// localhost:port/api/groups/:id
router.delete('/:id',controller.deleteGrouplById);
// localhost:port/api/groups
router.post('/add/:specId',controller.addGroup);
// localhost:port/api/groups/:id
router.patch('/:id',controller.udpateGroupById);
// localgost:port:api/groups/:specId:courseNumber
router.get('/:specId:courseNumber');


module.exports = router;