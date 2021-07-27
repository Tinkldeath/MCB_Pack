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
    const reqSubjectId = req.body.categoryId;
    const reqName = req.body.name;

    const subject = new Subject({
        categoryId: reqSubjectId,
        name: reqName
    })

    try {
        const found = await Subject.findOne({categoryId: reqSubjectId,postName: reqName},(err) => {
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
    const reqSubjectId = req.body.categoryId;
    const reqName = req.body.name;
    try{
        await Subject.findByIdAndUpdate(reqSubjectId,{
            categoryId: reqSubjectId,
            name: reqName}, (err) => {
                if(err){
                    console.log(err);
                    res.json({
                        message: 'DB error'
                    });
                }
                else{
                    console.log(`Subject ${reqSubjectId} updated`);
                    res.json({
                        message: 'Subject updated'
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
    const reqSubjectId = req.body.categoryId;  
    try {
        await Subject.findByIdAndDelete(reqSubjectId,(err)=>{
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                res.json({
                    message: `Subject ${reqSubjectId} deleted`
                })
            }
        });
    } catch (err) {
        if(err){
            console.log(err);
            res.json({
                message: 'server error'
            });
        }
    }
}

//610066c3f027ba1a787dac97