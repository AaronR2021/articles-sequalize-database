//complete
var express = require('express');
var {User,Article,Comments}=require('../model/user');
var jwt = require('jsonwebtoken');

const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');

var router = express.Router();

/* CRUD OPERATION */
router
.get('/',async function(req,res,next){
  //list 10 recent posts 
 // res.send('user-home-page')
 Article.findAll({attributes:[
  'title','desc'
]}).then((data)=>{
  res.status(200).json({data})
});
})
.post('/signup',async function (req,res,next){
  //sign up
  let {email,password,username}=req.body;
  //validate
  if(email==''||password==''||username==''){
    res.status(300).json({error:'missing credentials'})
  }
   console.log(email,password,username)
  //create user
  User.create({email,password,username},{fields:['email','password','username']})
  .then((data)=>{
    console.log(data,'is data')
    //user created successfully
    const userJson=data.toJSON()
    const payload={email:userJson.email,username:userJson.username}
    //create jtw token and send
    var token = jwt.sign(payload,process.env.LOGIN_JWT_SECRET);
    res.json({...payload,token})

  })
  .catch(err=>{

    //user already exists
    console.log(err)
    res.status(500).json({error:'username already exists'})

  })

})
.post('/login',async function(req,res,next){
  //login with credentials

  //get credentials
  const {email,password}=req.body;
  //check email exists
  User.findOne({where:{email:email}})
  .then(async function(user){     

    if(!user){
      res.status(300).json({error:'user not found'})
    }
    else if( ! await user.validate(password)){
      res.status(300).json({error:'incorrect password'})
    }
    else{
      //user created successfully
      const userJson=user.toJSON()
      const payload={email:userJson.email,username:userJson.username}
      //create jtw token and send
      var token = jwt.sign(payload,"isbSDuniijniuniubsrvkjnIUNJDFSVIJNIinhjdsinviniqq");
      res.status(200).json({success:'successfull login',...payload,token})
    } 
  })

  //send back token with email and username

})

module.exports = router;
