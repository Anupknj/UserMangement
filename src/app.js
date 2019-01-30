const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
var jwt = require('jsonwebtoken');
const Joi = require('joi');
const app=express();

mongoose.connect('mongodb://localhost/user_info');
mongoose.Promise= global.Promise;

app.use(bodyParser.json());

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
     next();
  });

app.use('/api',require('./router/api.js')); 
 

app.use(function(err,req,res,next){
    res.status(422).send({error : err.message});

});

app.listen(4000,()=>{
    console.log(`listening`);
});