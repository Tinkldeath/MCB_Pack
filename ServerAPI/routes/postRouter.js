const express = require('express');
const bodyParser = require('../node_modules/body-parser');
const router = express.Router();

const controller = require('./../controllers/postController');
const upload = require('../middleware/upload');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.get('/all',controller.getAll); // Запрос на получение всех постов
//localhost:port/api/post/all

router.get('/post',controller.getPost); // Запрос на получение файла по айди поста (дописать метод в контроллере)
//localhost:port/api/post/post

router.post('/add',upload.single('file'),controller.addPost); // Запрос на добавление поста (дописать метод в контроллере)
//localhost:port/api/post/add

router.patch('/update',upload.single('file'),controller.patchPost); // Запрос на обновление поста по айди (дописать метод в контроллере)
//localhost:port/api/post/update

router.delete('/delete',controller.deletePost); // Запрос на удаление поста по айди (дописать метод в контроллере)
//localhost:port/api/post/delete

module.exports = router;