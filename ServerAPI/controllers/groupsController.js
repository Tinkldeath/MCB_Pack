const Groups = require('./../models/groupsModel');
const Schedules = require('./../models/scheduleModel');

module.exports.getAllGroups = async function(req,res){
    
    const reqSpecId = req.params.specId;
    await Groups.find({specId: reqSpecId}, function(err,docs){
        if(err){
            return res.sendStatus(400);
        }
        return res.send(docs);
    })
}

module.exports.getGroupsWithCourseNumber = async function (req,res) { //GET REQUEST
    
    const reqSpecId = req.params.specId;
    const reqCourseNumber = req.body.courseNumber;
        await Groups.findOne({specId: reqSpecId, courseNumber: reqCourseNumber},function (err,doc) {
            if(err){
                return res.sendStatus(400);
            }
            else{
                return res.send(doc);
            }
        }).catch(err => {
            if(err){
                return res.sendStatus(400);
            }
        })
    }

module.exports.getGroupById = async function (req,res){ //GET REQUEST
    
    const reqId = req.params.id;

        await Groups.find({_id: reqId}, function(err,doc){
            if(err){
                
                return res.sendStatus(400);
            }
            else{
                return res.send(doc);
            }
        })
    }
module.exports.deleteGrouplById = async function (req,res){ //DELETE REQUEST
    
    const reqId = req.params.id;
    await Schedules.deleteMany({specId: reqId},function(err){
        if(err){
            console.log('При удалении связанных расписаний произошла ошибка' + err);
            return res.sendStatus(400);
        }
        console.log('Связанные расписания удалены');
    })
        await Groups.findByIdAndDelete(reqId,{}, function(err){
            if(err){
                console.log('Произошла ошибка при поиске в deleteGrouplById ' + err);
                return res.sendStatus(400);
            }
        }).then(() => {
            console.log('Удалена группа с id ' + reqId);
            return res.sendStatus(200);
        }).catch(err => {
            if(err){
                console.log('Произошла ошибка при удалении в deleteGrouplById ' + err);
                return res.sendStatus(400);
            }
        })
    }

module.exports.addGroup = async function (req,res){ //POST REQUREST
   
    const reqSpecId = req.params.specId;
    const reqGroupName = req.body.groupName;
    const reqCourseNumber = req.body.courseNumber;
        const exists = await Groups.findOne({groupName: reqGroupName, courseNumber: reqCourseNumber});
            if(exists){
                console.log('Группа, которую вы пытаетесь создать, уже существует');
                return res.sendStatus(409);
            }
            else{
            const group = new Groups({
                specId: reqSpecId,
                groupName: reqGroupName,
                courseNumber: reqCourseNumber
            });
            await group.save({})
            .then(() => {
                console.log('Группа ' + reqGroupName + ' сохранена');
                return res.sendStatus(200);
            })
            .catch(err => {
                if(err){
                    console.log('Произошла ошибка в addGroup ' + err);
                    return res.sendStatus(400);
                }
            });      
        }
    }

module.exports.udpateGroupById = async function (req,res){ //PATCH REQUEST

    const reqGroupId = req.params.id;
    const reqGroupName = req.body.groupName;
    const reqCourseNumber = req.body.courseNumber;
        await Groups.findByIdAndUpdate(reqGroupId,{groupName: reqGroupName, courseNumber: reqCourseNumber},function(err){
            if(err){
                return res.sendStatus(400);
            }
            else{
                console.log('Теперь группа с id ' + reqGroupId + ' называется ' + reqGroupName + ' и номер курса - ' + reqCourseNumber);
                return res.sendStatus(200);
            }
        }) 
    }

module.exports.getOnlyGroupsByCourse = async function(req,res){

    const reqSpecId = req.params.specId;
    const reqCourseNumber = req.params.courseNumber;
    await Groups.find({specId: reqSpecId, courseNumber: reqCourseNumber},function(err,docs){
        if(err){
            return res.sendStatus(400);
        }
        else{
            res.send(docs);
        }
    })
}