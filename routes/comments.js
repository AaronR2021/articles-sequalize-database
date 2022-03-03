var express = require('express');
var {Article}=require('../model/user');
const {verifyToken}=require('../middleware/auth')
const { Op } = require('@sequelize/core');
const { Sequelize } = require('sequelize');

var router = express.Router();

router
.post('/create/:articleId',verifyToken,async function(req,res,next){
  //get article{} from articleId and add comment to it
  const {articleId}=req.params;
  const {comment}=req.body;

  let article=await Article.findOne({where:{ id:articleId }})
  if(article){
    article.createComment({comment:comment}).then((data)=>{
      res.status(200).json({message:'successful in posting a comment'})
    }).catch((e)=>next(e))
  }
  else{
    res.status(300).json({error:'article does not exist'})
  }
});


module.exports = router;