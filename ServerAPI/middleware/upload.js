const Multer = require('multer');
const Moment = require('moment');

const Storage = Multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/');
    },
    filename(req,file,cb){
        cb(null,`${req.body.ownerId}-${Moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`);
    }
});

const FileFilter = (req,file,cb) => {
    if(file.mimetype === 'application/msword' || 
       file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
       file.mimetype === 'application/pdf' || 
       file.mimetype === 'application/vnd.ms-powerpoint' ||
       file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
       file.mimetype === 'application/vnd.ms-excel' ||
       file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
       file.mimetype === 'image/gif' ||
       file.mimetype === 'image/jpeg' || 
       file.mimetype === 'image/png' || 
       file.mimetype === 'image/tiff' || 
       file.mimetype === 'video/x-msvideo' ||
       file.mimetype === 'audio/mpeg' ||
       file.mimetype === 'video/mpeg' ||
       file.mimetype === 'application/zip' ||
       file.mimetype === 'application/vnd.rar' ||
       file.mimetype === 'text/plain'){
        cb(null,true);
    }
    else{
        cb('Wrong type error',false);
    }
};

module.exports = Multer({
    storage: Storage,
    fileFilter: FileFilter
});