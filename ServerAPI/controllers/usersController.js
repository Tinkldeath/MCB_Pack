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