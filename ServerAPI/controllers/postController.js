const Post = require('./../models/postModel');
const fs = require('fs');

module.exports.getPost = async function(req,res){
    const reqPostId = req.body._id
    try {
        await Post.findById(reqPostId, function (err,docs) {
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

module.exports.addPost = async function(req,res){
    // Логика добавления поста
    const reqOwnerId = req.body.ownerId;
    const reqPostName = req.body.name;
    const reqPostTheme = req.body.theme;
    const reqCourseNumber = req.body.courseNumber;
    const reqAuthor = req.body.author;
    const reqYear = req.body.year;
    const reqUniversity = req.body.university;
    const reqSubjectName = req.body.subject;
    const reqCategory = req.body.category;
    const reqDescription = req.body.description;
    const reqFile = req.file;

    const post = new Post({
        ownerId: reqOwnerId,
        name: reqPostName,
        theme: reqPostTheme,
        courseNumber: reqCourseNumber,
        author: reqAuthor,
        year: reqYear,
        university: reqUniversity,
        subject: reqSubjectName,
        category: reqCategory,
        description: reqDescription,
        fileUrl: reqFile.path
    });

    try {
        const found = await Post.findOne({ownerId: reqOwnerId,name: reqPostName},(err) => {
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
            return;
        }
        else{
            await post.save().then(() => {
                console.log('Post created');
                res.json({
                    message: 'Created',
                    post: post
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

module.exports.patchPost = async function (req,res) {
    // Логика обновления поста
    const reqPostId = req.body._id;
    const reqPostName = req.body.name;
    const reqPostTheme = req.body.theme;
    const reqCourseNumber = req.body.courseNumber;
    const reqAuthor = req.body.author;
    const reqYear = req.body.year;
    const reqUniversity = req.body.university;
    const reqSubjectName = req.body.subject;
    const reqCategory = req.body.category;
    const reqDescription = req.body.description;
    const reqFile = req.file;

    try {
        await Post.findOne({_id: reqPostId},(err,doc) => {
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                const filepath = doc.fileUrl;
                fs.unlink(filepath, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                });
            }
        });
        // Забыл обратиться к модели Post, я подправил
        await Post.findByIdAndUpdate(reqPostId,{
            name: reqPostName,
            theme: reqPostTheme,
            courseNumber: reqCourseNumber,
            author: reqAuthor,
            year: reqYear,
            university: reqUniversity,
            subject: reqSubjectName,
            category: reqCategory,
            description: reqDescription,
            fileUrl: reqFile.path}, (err) => {
                if(err){
                    console.log(err);
                    res.json({
                        message: 'DB error'
                    });
                }
                else{
                    console.log(`Post ${reqPostId} updated`);
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

module.exports.deletePost = async function (req,res) {
    // Логика удаления поста
    const reqPostId = req.body._id;
    try {
        await Post.findById(reqPostId,(err,doc) => {
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                const filepath = doc.fileUrl;
                fs.unlink(filepath, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            }
        });
        await Post.findByIdAndDelete(reqPostId,(err)=>{
            if(err){
                console.log(err);
                res.json({
                    message: 'DB error'
                });
            }
            else{
                res.json({
                    message: 'Deleted'
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

module.exports.getAll = async function(req,res){
    try {
        // Пропустил trycatch для серверных ошибок, и вроде где-то забыл сделать лог в консоли
        await Post.find({},function(err,docs){
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
        if(err){
            console.log(err);
            res.json({
                message: 'Server error'
            });
        }
    }
}