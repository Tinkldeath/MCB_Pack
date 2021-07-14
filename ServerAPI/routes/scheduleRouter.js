const express = require('express');
const controller = require('./../controllers/scheduleController');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// localhost:port/api/schedule/:groupId
router.get('/:groupId',controller.getScheduleByGroupId);
// localhost:port/api/schedule/add
router.post('/add',controller.addSchedule);
// localhost:port/api/schedule/:groupId
router.patch('/:id',controller.updateScheduleById);
// localhost:port/api/schedule/:id
router.delete('/:id',controller.deleteScheduleById);
// localhost:port/api/schedule/:specId
router.delete('/:groupId',controller.deleteAllSchedules);

module.exports = router;