const Admin = require('./../models/adminsModel');

module.exports.login = async function (req,res) {
    const reqLogin = req.body.login;
    const reqPassword = req.body.password;

    const loggedIn = await Admin.findOne({login: reqLogin, password: reqPassword});
    if (loggedIn){
        // Accepted
        res.sendStatus(202);
    }
    else{
        // Not accepted
        res.sendStatus(401);
    }
}

module.exports.add = async function (req,res) {
    // await login password
    const reqLogin = req.body.login;
    const reqPassword = req.body.password;
    const maybeAdmin = await Admin.findOne({login: reqLogin });

    if (maybeAdmin){
        // status: conflict
        res.sendStatus(409);
    }
    else{
        const newAdmin = new Admin({
            login: reqLogin,
            password: reqPassword
        });
        try{
            //status: added
            await newAdmin.save({});
            res.sendStatus(201);
        }
        catch(err){
            //status: error
            res.sendStatus(400);
        }
    }
};