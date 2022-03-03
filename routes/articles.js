var express = require('express');
var {User,Article,Comments,Likes}=require('../model/user')
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
  //find all articles by a specific userId.
const userId=req.params.userId;
  Article.findAll({
    where:{
      user_id:userId
           },
    attributes: ['title', 'desc'],          
}).then((article)=>{
    if(!article){
      res.status(200).json({length:0})
    }
    res.json({article,length:article.length})
  })
})

.post('/like/:articleId',verifyToken,async function(req,res,next){
  //like the article
  const articleId=req.params.articleId

  Article.findOne({where:{
    id:articleId
  }})
  .then((article)=>{
    if(!article){
      res.status(300).json({error:'article no longer exists'})
    }
    else{
      //article found
      User.findOne({where:{email:req.user.email}}).then((user)=>{
        if(!user){
          res.status(300).json({error:'user does not exists/invaid token'})
        }
        else{
          //article and user info in this block
          Likes.findOne({where:{
            [Op.and]:{
              ArticleId:article.id,
              UserId:user.id
            }
          }}).then((activity)=>{
           console.log(activity)
           if(!activity){
            //user has still not liked the post
             //user of addUser should be capital <===
            article.addUsers(user).then(()=>{
            res.status(200).json({success:'you liked the article'})
                                              })
          }
          else{
          res.status(300).json({error:'you already liked the article'})
          }
           
          })
         
        }
      })
      

    }
    
  })

})

.post('/unlike/:articleId',verifyToken,async function(req,res,next){
  //unlike the article
  const articleId=req.params.articleId

  Article.findOne({where:{
    id:articleId
  }})
  .then((article)=>{
    if(!article){
      res.status(300).json({error:'article no longer exists'})
    }
    else{
      //article found
      User.findOne({where:{email:req.user.email}}).then((user)=>{
        if(!user){
          res.status(300).json({error:'user does not exists/invaid token'})
        }
        else{
          //article and user info in this block
          Likes.destroy({where:{
            [Op.and]:{
              ArticleId:article.id,
              UserId:user.id
            }
          }}).then(activity=>{
            if(activity>0){
              res.status(200).json({success:'unliked post'})
            }
            else{
              res.status(200).json({error:'there is nothing to unlike'})
            }
          })
         
        }
      })
      

    }
    
  })

})
.get('/delete/:articleId',verifyToken,async function(req,res,next){
const articleId=req.params.articleId
const user=await User.findOne({where:{
  email:req.user.email
}})
  Article.destroy({where:{
    [Op.and]:{
      user_id:user.id,
      id:articleId
    }
  }}).then((val)=>{
    console.log(val)
    if(val>0){
      res.status(200).json({success:'sucessfully deleted article'})
    }
    else{
      res.status(200).json({error:'you dont have permission to delete this article'})
    }
  })
})
.get('/comments/:articleId',async function(req,res,next){
  //get all comments for that given article id
  const articleid=req.params.articleId;
  Comments.findAll({
    where:{
    article_id:articleid,
        },
    attributes: ['comment'],          
}).then(data=>{
  res.status(200).json({data})
})
})
module.exports = router;
