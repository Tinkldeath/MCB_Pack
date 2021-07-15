const express = require('express');
const controller = require('./../controllers/fileController');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.get('/:postId',controller.getFile); // Запрос на получение файла по айди поста (дописать метод в контроллере)
//localhost:port/api/file/:postId

router.post('/add/:postId',controller.addFile); // Запрос на добавление файла по айди поста (дописать метод в контроллере)
//localhost:port/api/file/add/:postId

router.patch('/:postId',controller.patchFile); // Запрос на обновление файла по айди поста (дописать метод в контроллере)
//localhost:port/api/file/:postId

router.delete('/:postId',controller.deleteFile); // Запрос на удаление файла по айди поста (дописать метод в контроллере)
//localhost:port/api/file/:postId

module.exports = router;