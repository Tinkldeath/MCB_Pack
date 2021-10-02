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
            }, Keys.jwt, {expiresIn: 60*60*24});
            // Отправляем сгенерированный токен
            res.status(200).json({
                token: `Bearer ${resToken}`,
                user: found
            });
        }
        else{
            // Пароли не совпали
            res.json({
                token: null,
                user: null
            });
        }
    }
    else{
        res.json({
            token: 'not found',
            user: null
        }).status(404);
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
        res.json({
            message: 'Conflict'
        });
    }
    else{
        const salt = Bcrypt.genSaltSync(10);
        const pas = req.body.password;
        const user = new User({
            login: req.body.login,
            password: Bcrypt.hashSync(pas,salt),
            isAdmin: req.body.isAdmin,
            isModer: req.body.isModer,
            favorites: []
        });
        try {
            await user.save().then(() => {
                console.log('User created');
            });
            res.json({
                message: 'Created'
            });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Server error'
            });
        }
    }
}

//логика обновления пароля
module.exports.changePassword = async function(req,res){
    const salt = Bcrypt.genSaltSync(10);
    const reqLogin = req.body.login;
    const reqNewPassword = req.body.password;
    
    try {
        // $set: было лишним, поэтому апдейт пароля падал, это вроде старый синтаксис
        // по новому можно просто вторым параметром передавать объект с заменяемым полем
        await User.findOneAndUpdate(
            {login: reqLogin},
            {password: Bcrypt.hashSync(reqNewPassword,salt)},
            function(err){
                if(err){
                    console.log(err);
                    res.json({
                        message: 'DB error'
                    });
                }
                else{
                    console.log(`Password of user ${reqLogin} updated`);
                    res.json({
                        message: 'Password updated'
                    });
                }
            }
        );
        
    } catch (err) {
        if(err){
            console.log(err);
            res.json({
                message: 'Server error.'
            });
        }
    }

}

//логика обновления логина
module.exports.changeLogin = async function(req,res){
    
    const reqId = req.body._id;
    const reqLogin = req.body.login;
    const found = await User.findOne({login: reqLogin},function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    if(found){
        res.json({
            message: 'Conflict'
        });
    }
    else{
        // А здесь ты вызывал несуществующий метод у mongoose, я добавил существующий
        try {
            await User.findByIdAndUpdate(reqId,{login: reqLogin},
                function(err){
                    if(err){
                        console.log(err);
                        res.json({
                            message: 'DB error'
                        });
                    }
                    else{
                        console.log("Login updated.");
                        res.json({
                            message: 'Login updated.'
                        });
                    }
                }
            );
            
        } catch (err) {
            if(err){
                console.log(err);
                res.json({
                    message: 'Server error.'
                });
            }
        }
    }
}
