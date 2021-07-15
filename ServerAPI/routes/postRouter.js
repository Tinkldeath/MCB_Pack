const express = require('express');
const controller = require('./../controllers/postController');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.get('/:postId',controller.getPost); // Запрос на получение файла по айди поста (дописать метод в контроллере)
//localhost:port/api/post/:postId

router.post('/add',controller.addPost); // Запрос на добавление поста (дописать метод в контроллере)
//localhost:port/api/post/add

router.patch('/:postId',controller.patchPost); // Запрос на обновление поста по айди (дописать метод в контроллере)
//localhost:port/api/post/:postId

router.delete('/:postId',controller.deletePost); // Запрос на удаление поста по айди (дописать метод в контроллере)
//localhost:port/api/post/:postId

module.exports = router;