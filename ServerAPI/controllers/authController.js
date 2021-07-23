const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('./../models/userModel');
const Keys = require('./../config/keys');

// Логика входа без защиты пароля
module.exports.login = async function(req,res){
    const reqLogin = req.body.login;
    const reqPas = req.body.password;
    // Ищем такого юзера
    const found = await User.findOne({login: reqLogin},function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    if(found){
        // Проверяем пароль
        const pasRes = Bcrypt.compareSync(reqPas,found.password);
        if(pasRes){
            // Генерируем токен для пользователя, обновляется каждый час
            const resToken = JWT.sign({
                _id: found._id,
                login: found.login,
                isAdmin: found.isAdmin 
            }, Keys.jwt, {expiresIn: 60*60});
            // Отправляем сгенерированный токен
            res.status(200).json({
                token: `Bearer ${resToken}`
            });
        }
        else{
            // Пароли не совпали
            res.sendStatus(401);
        }
    }
    else{
        res.sendStatus(404);
    }
}

// Логика регистрации с защитой пароля
module.exports.register = async function(req,res){
    const found = await User.findOne({login: req.body.login},function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    if(found){
        res.sendStatus(409);
    }
    else{
        const salt = Bcrypt.genSaltSync(10);
        const pas = req.body.password;
        const user = new User({
            login: req.body.login,
            password: Bcrypt.hashSync(pas,salt),
            isAdmin: req.body.isAdmin
        });
        try {
            await user.save().then(() => {
                console.log('User created');
            });
            res.sendStatus(201);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}