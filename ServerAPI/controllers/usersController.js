const User = require('./../models/userModel');

module.exports.GetAll = async function(req,res){
    try {
        await User.find({},function(err,docs){
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                res.send(docs);
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Server error'
        });
    }
}

module.exports.Delete = async function(req,res){
    try {
        const reqLogin = req.body.login;
                await User.findOneAndDelete({login: reqLogin}, (err) => {
                    if(err){
                        console.log(err);
                        res.json({
                            message: 'DB error'
                        });
                    }
                    else{
                        console.log(`The user ${reqLogin} deleted`);
                        res.json({
                            message: 'Deleted'
                        });
                    }
                });

    } catch (err) {
        if(err){
            console.log(err);
            res.json({
                message: 'Server error'
            });
        }
    }
}