const Schedule = require('./../models/scheduleModel');

module.exports.getScheduleByGroupId = async function (req,res) { //GET REQUEST
    
    const pairsTemplate = [
        {
            day: 'Пн',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Вт',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Ср',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Чт',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Пт',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Сб',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        }
    ];
    const reqGroupId = req.params.groupId;
        await Schedule.find({groupId: reqGroupId},function(err,docs){
            if(err){
                return res.sendStatus(400);
            }
            if(!docs.length){
                let sced = new Schedule({
                    groupId: req.params.groupId,
                    chisl: true,
                    pairs: pairsTemplate
                })
                sced.save({});
                console.log('Добавлен числитель для специальности с id ' + req.params.groupId);
                sced = new Schedule({
                    groupId: req.params.groupId,
                    chisl: false,
                    pairs: pairsTemplate
                })
                sced.save({});
                console.log('Добавлен знаменатель для специальности с id ' + req.params.groupId);
                return res.sendStatus(302);
            }
            return res.send(docs);
        })
    }

module.exports.addSchedule = async function (req,res){
 
    const pairsTemplate = [
        {
            day: 'Пн',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Вт',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Ср',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Чт',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Пт',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        },
        {
            day: 'Сб',
            pair1: 'Пара 1',
            pair2: 'Пара 2',
            pair3: 'Пара 3',
            pair4: 'Пара 4',
            pair5: 'Пара 5',
        }
    ];
    let reqChisl = req.body.chisl;
    const reqGroupId = req.body.groupId;
    await Schedule.findOne({chisl: reqChisl, groupId: reqGroupId},function(err,doc){
        if(err){
            return res.sendStatus(400);
        }
        if(doc){
            return res.sendStatus(409);
        }
        else{
            const schedule = new Schedule({
                groupId: reqGroupId,
                chisl: reqChisl,
                pairs: pairsTemplate
            });
            schedule.save().then(() => {
                res.sendStatus(200);
            })
        }
    })
}

module.exports.updateScheduleById = async function (req,res) { //PATCH REQUEST
    
    const reqId = req.params.id;
    const reqNewPairs = req.body.newPairs;
    await Schedule.findByIdAndUpdate(reqId,{pairs: reqNewPairs},function(err){
            if(err){
                return res.sendStatus(400);
            }
        }).then(() => {    
        console.log('Расписания обновлены');
        return res.sendStatus(200);        
    });
}
    
module.exports.deleteScheduleById = async function (req,res) { //DELETE REQUEST
    
    const reqId = req.params.id;
        await Schedule.findByIdAndDelete(reqId,function(err,doc){
            if(err){
                return res.sendStatus(400);
            }
            console.log('Удалено расписание ' + doc);
        })
        return res.sendStatus(200);
    }

module.exports.deleteAllSchedules = async function(req,res){

    await Schedule.find({specId: req.params.groupId},function(err,docs){
        if(err){
            return res.sendStatus(400);
        }
        for(let doc of docs){
            console.log('Удаляю расписание с id ' + doc._id);
            Schedule.findByIdAndDelete(doc._id)
        }
    });
}