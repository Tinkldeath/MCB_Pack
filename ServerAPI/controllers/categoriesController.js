const Category = require('./../models/categoriesModel');

module.exports.getAll = async function(req,res){
    await Category.find({},function(err,docs){
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

module.exports.addCategory = async function(req,res){
    const reqName = req.body.name;
    const reqDescription = req.body.description;
    const category = new Category({
        name: reqName,
        description: reqDescription
    });
    const found = await Category.findOne({name: reqName},(err)=>{
        if(err){
            console.log(err);
            res.json({
                message: 'DB error'
            });
        }
    });
    if(found){
        res.json({
            message: 'Conflict'
        });
        return;
    }
    else{
        try {
            await category.save().then(() => {
                console.log('Category created');
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

module.exports.removeCategory = async function(req,res){
    const reqId = req.params.id;
    try {
        await Category.findByIdAndDelete(reqId,(err) => {
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                console.log(`Category ${reqId} deleted`);
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

module.exports.updateCategory = async function(req,res){
    const reqId = req.body._id;
    const reqName = req.body.name;
    const reqDescription = req.body.description;
    try {
        await Category.findByIdAndUpdate(reqId,{name: reqName, description: reqDescription},(err) => {
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                console.log(`Category ${reqId} updated`);
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