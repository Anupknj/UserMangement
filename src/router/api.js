const express = require('express');
const router= express.Router();
const User = require('../user.js');
const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Joi = require('joi');
const expressJoiMiddleware = require('express-joi-middleware');
const app=express();




router.get('/users',function(req,res,next){
    User.find({}).then(function(users){
        res.send(users).catch(next);
    })
});

router.get('/user/:user_name',ensureToken,function(req,res){
    
        jwt.verify(req.token,'secret_key_goes_here',function(err,data) {
               
                  if(err){
                    res.sendStatus(401);
                }

                if(!err){
                
                 User.find({user_name:req.params.user_name}).then(function(user){
                 res.send(user)
                }); 
          }  
        
     });

  });

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }




 router.get('/users/:user_name',function(req,res,next){
    

    const token = jwt.sign({ id : req.params.user_name }, 'secret_key_goes_here',{ expiresIn: 60 });
     res.json({
     message: 'Authenticated! Use this token in the Authorization header',
     token: token
   });
   
   return this.token;

 });

 router.get('users/refreshToken',function(req,res,next){
     const token = jwt.sign({id : 'refreshToken' },'secret_key_goes_here');
     res.json({
         message : 'refresh token generated',
         token : token
     });
 });

  router.post('/users',function(req, res){
      const user = new User({
          first_name : req.body.first_name,
          last_name : req.body.last_name,
          user_name : req.body.user_name,
          password :  req.body.password,
          description : req.body.description
      });

      user
      .save()
      .then(result => {
          console.log(result);
          res.status(201).json({
              message : "created successfully",
              createdUser : {
                  first_name : result.first_name,
                  last_name : result.last_name,
                  user_name : result.user_name,
                  password : result.password,
                  description : result.description
              }
          });
      })
      .catch(err=>{
          console.log(err);
          res.status(500).json({
              error : err.message

      });

    });

  });


router.put('/users/:id',function(req,res,next){
 User.findByIdAndUpdate({_id : req.params.id},req.body).then(function(){
     User.findOne({_id : req.params.id}).then(function(user){
          res.send(user).catch(next);
     })
     
    });
});

router.delete('/users/:id',function(req,res,next){
  User.findByIdAndRemove({_id :req.params.id}).then(function(user){
    res.send(user).catch(next);
 })
});

module.exports=router;