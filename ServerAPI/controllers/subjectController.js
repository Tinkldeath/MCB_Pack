const Subject = require('../models/subjectModel');

module.exports.GetAll = async function(req,res){
    await Subject.find({},function(err,docs){
        if(err){
            console.log(err);
            res.json({
                message: 'DB error'
            });
        }
        else{
            res.send(docs);
        }
    })
}

module.exports.GetById = async function(req,res){
    const reqSubjectId = req.body.categoryId;
    try {
        await Subject.findById(reqSubjectId, function (err,docs) {
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                })
            }
            else{
                res.send(docs);
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

module.exports.Create = async function(req,res){
    const reqCategoryName = req.body.categoryName;
    const reqName = req.body.name;

    const subject = new Subject({
        categoryName: reqCategoryName,
        name: reqName
    });

    try {
        const found = await Subject.findOne({categoryName: reqCategoryName,name: reqName},(err) => {
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
        });
        if(found){
            res.json({
                message: 'Conflict',
            });
        }
        else{
            await subject.save().then(() => {
                console.log('Subject created');
                res.json({
                    message: 'Created',
                    subject: subject
                });
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Server error'
        });
    }
}

module.exports.Update = async function(req,res){
    const reqId = req.body._id;
    const reqCategoryName = req.body.categoryName;
    const reqName = req.body.name;
    try{
        await Subject.findByIdAndUpdate(reqId,{
            categoryName: reqCategoryName,
            name: reqName}, (err) => {
                if(err){
                    console.log(err);
                    res.json({
                        message: 'DB error'
                    });
                }
                else{
                    console.log(`Subject ${reqId} updated`);
                    res.json({
                        message: 'Updated'
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

module.exports.Delete = async function(req,res){
    const reqSubjectId = req.params.id;  
    try {
        await Subject.findByIdAndDelete(reqSubjectId,(err)=>{
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                console.log(`Subject ${reqSubjectId} deleted`);
                res.json({
                    message: `Deleted`
                })
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
