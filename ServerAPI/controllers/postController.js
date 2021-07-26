const { findOneAndUpdate } = require('./../models/postModel');
const Post = require('./../models/postModel');

module.exports.getPost = async function(req,res){
    const reqPostId = req.body.postId
    try {
        await Post.findById(reqPostId, function (err,docs) {
            if(err){
                console.log(err);
                return res.json({
                    message: 'DB error'
                })
            }
            else{
                return res.send(docs);
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
    const reqPostId = req.body.postId;
    const reqOwnerId = req.body.ownerId;
    const reqPostName = req.body.postName;
    const reqPostTheme = req.body.postTheme;
    const reqCourseNumber = req.body.CourseNumber;
    const reqAuthor = req.body.author;
    const reqYear = req.body.year;
    const reqUniversity = req.body.university;
    const reqSpecial = req.body.special;
    const reqCategory = req.body.category;
    const reqDescription = req.body.description;
    const reqFileUrl = req.body.fileUrl;

    const post = new Post({
        postId: reqPostId,
        ownerId: reqOwnerId,
        postName: reqPostName,
        postTheme: reqPostTheme,
        courseNumber: reqCourseNumber,
        author: reqAuthor,
        year: reqYear,
        university: reqUniversity,
        special: reqSpecial,
        category: reqCategory,
        description: reqDescription,
        fileUrl: reqFileUrl
    });

    try {
        // Тут надо отправлять ответ только после отработки промиса
        await post.save().then(() => {
            console.log('Post created');
            res.json({
                message: 'Created'
            });
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Server error'
        });
    }

}

module.exports.patchPost = async function (req,res) {
    // Логика обновления поста
    const reqPostId = req.body.postId;
    try {
        // Забыл обратиться к модели Post, я подправил
        await Post.findByIdAndUpdate(reqPostId,{postId: reqPostId,
            ownerId: reqOwnerId,
            postName: reqPostName,
            postTheme: reqPostTheme,
            courseNumber: reqCourseNumber,
            author: reqAuthor,
            year: reqYear,
            university: reqUniversity,
            special: reqSpecial,
            category: reqCategory,
            description: reqDescription,
            fileUrl: reqFileUrl}, (err) => {
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
    const reqPostId = req.body.postId;
    try {
        // Тут тоже забыл обратиться к модели Post, я подправил
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
        })
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