const express = require('express');
const bodyParser = require('../node_modules/body-parser');
const router = express.Router();

const controller = require('./../controllers/postController');
const upload = require('../middleware/upload');
const passport = require('passport');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.get('/all',controller.getAll); // Запрос на получение всех постов
//localhost:port/api/posts/all

router.get('/post',passport.authenticate('jwt',{session: false}),controller.getPost); // Запрос на получение файла по айди поста (дописать метод в контроллере)
//localhost:port/api/posts/post

router.post('/add',passport.authenticate('jwt',{session: false}),upload.single('file'),controller.addPost); // Запрос на добавление поста (дописать метод в контроллере)
//localhost:port/api/posts/add

router.patch('/update',passport.authenticate('jwt',{session: false}),upload.single('file'),controller.patchPost); // Запрос на обновление поста по айди (дописать метод в контроллере)
//localhost:port/api/posts/update

router.delete('/delete/:id',passport.authenticate('jwt',{session: false}),controller.deletePost); // Запрос на удаление поста по айди (дописать метод в контроллере)
//localhost:port/api/posts/delete/:id

module.exports = router;