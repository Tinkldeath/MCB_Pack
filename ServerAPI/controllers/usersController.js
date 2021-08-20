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

module.exports.Update = async function(req,res){
    try {
        const reqId = req.body._id;
        const newAdmin = req.body.isAdmin;
        const newModer = req.body.isModer;
        const newFavs = req.body.favorites;
        await User.findByIdAndUpdate(reqId,{isAdmin: newAdmin, isModer: newModer,favorites: newFavs},(err) => {
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                res.json({
                    message: 'Updated'
                });
            }
        });
    } catch (err) {
        res.json({
            message: 'Server error'
        });
    }
}

module.exports.Delete = async function(req,res){
    try {
        const reqId = req.params.id;
                await User.findByIdAndDelete(reqId, (err) => {
                    if(err){
                        console.log(err);
                        res.json({
                            message: 'DB error'
                        });
                    }
                    else{
                        console.log(`The user ${reqId} deleted`);
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