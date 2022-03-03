var express = require('express');
var {User,Article,Comments}=require('../model/user')
const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');
const {verifyToken}=require('../middleware/auth')

var router = express.Router();

/* CRUD OPERATION */
router
.get('/',verifyToken,(req,res,next)=>{
  console.log(req.user)
  res.json({meg:'ee'})
})
.post('/create',verifyToken,async function(req,res,next){
//accept jwt token find the user id from its email<== for that user{} create article
const {title,desc}=req.body;

if(title==null||desc==null){

  res.status(300).json({
    error:'missing fields'
  })

}
else{
  User.findOne({
    where:{
      email:req.user.email
          }
        }).then(async(user)=>{

          //user not found probably because of no token and not logged in.
          if(!user){
            res.status(300).json({error:'please login in / send token in header'})
          }

          //user exists
          else{

         //user wrote an article and associated it to the token user.
          user.createArticle({title,desc})
          .then(data=>{
            res.status(200).json({message:'article created'})
          })
          .catch(e=>next(e))
          }
        })
}

})

.get('/:userId',async function(req,res,next){
  //find all articles by this userId.
const userId=req.params.userId
})
.post('/like/:articleId',async function(req,res,next){
  //like the article
})
.post('/unlike/:articleId',async function(req,res,next){
  //unlike the article
})

module.exports = router;
