const Special = require('./../models/specialsModel');
const Groups = require('./../models/groupsModel');

module.exports.getSpecials = async function (req,res) { //GET REQUEST

    await Special.find({},function(err,docs){
        if(err){
            return res.sendStatus(400);
        }
        else{
            return res.send(docs);
        }
    })
}

module.exports.getSpecialById = async function (req,res){ //GET REQUEST

    const reqId = req.params.id;
    await Special.findOne({_id: reqId}, function(err,doc){
            if(err){
                return res.sendStatus(400);
            }
            else{
                res.send(doc);
            }
        })
    } 

module.exports.deleteSpecialById = async function (req,res){ //DELETE REQUEST

    const reqId = req.params.id;
    await Groups.deleteMany({specId: reqId},function(err){
        if(err){
            console.log('При удалении связанных групп произошла ошибка ' + err);
            return res.sendStatus(400);
        }
        console.log('Связанные группы и расписания успешно удалены');
    });
        await Special.findOneAndDelete({_id: reqId}, function(err){
            if(err){
                return res.sendStatus(400);
            }
            else{
                console.log('Специальность удалена');
                return res.sendStatus(200);
            }
        });
} 

module.exports.addSpecial = async function (req,res){ //POST REQUREST
    
    // await specName
        const reqSpecName = req.body.specName;
        console.log('Adding special '+ req.body.specName);
        const exists = await Special.findOne( {specName: reqSpecName} ).then((err) => {
            if(err){
                return res.sendStatus(400);
            }
        });
        if (exists){
        // status: conflict
            return res.sendStatus(409);
        }
        else{
                const newSpec = new Special({
                specName: reqSpecName
            });
            //status: added
            await newSpec.save({}).then(() => {
                console.log('Специальность '+ reqSpecName + ' добавлена');
                res.sendStatus(200);
            })
        }
    }

module.exports.udpateSpecialById = async function (req,res){ //PATCH REQUEST

    const reqSpecId = req.params.id;
    await Special.findByIdAndUpdate(reqSpecId,{specName: req.body.specName}).then(() => {
            return res.sendStatus(200);
        }).catch(err => {
            if(err){
                return res.sendStatus(400);
            }
            return res.sendStatus(200);
        })
    } 