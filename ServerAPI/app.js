// App define
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('./node_modules/body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Routers define
const adminsRouter = require('./routes/adminsRouter');
const specialsRouter = require('./routes/specialsRouter');
const groupsRouter = require('./routes/groupsRouter');
const scheduleRouter = require('./routes/scheduleRouter');
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const subjectRouter = require('./routes/subjectRouter');

// Cors define
app.use(cors());
app.options('*', cors());

app.use(function (req, res, next) {
  //Enabling CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

// Routers use
app.use('/api/admin',adminsRouter);
app.use('/api/specials',specialsRouter);
app.use('/api/groups',groupsRouter);
app.use('/api/schedule',scheduleRouter);
app.use('/api/post',postRouter);
app.use('/api/auth',authRouter);
app.use('/api/categories',categoriesRouter);
app.use('/api/subject',subjectRouter);

// BodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// For Multer
app.use('/uploads', express.static('uploads'));

// Mongoose and db
mongoose.connect(keys.mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function (err){
    if (err)
    {
       return console.log(err);
    }
    console.log('DB connected succsessfully');
});

module.exports = app;