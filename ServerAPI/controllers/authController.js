const User = require('./../models/userModel');

// Логика входа без защиты пароля
module.exports.login = async function(req,res){
    const reqLogin = req.body.login;
    const reqPas = req.body.password;
    const found = await User.findOne({login: reqLogin, password: reqPas},function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    if(found){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(404);
    }
}

// Логика регистрации без защиты пароля
module.exports.register = async function(req,res){
    const user = new User({
        login: req.body.login,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });
    const found = await User.findOne({login: req.body.login, password: req.body.password},function(err){
        if(err){
            console.log(err);
            return;
        }
    })
    if(found){
        res.sendStatus(409);
    }
    else{
        user.save().then(() => {
            console.log('User created');
        });
        res.sendStatus(200);
    }
}