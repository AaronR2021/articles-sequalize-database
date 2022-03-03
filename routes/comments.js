var express = require('express');
var {User,Article,Comments}=require('../model/user')

const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');

var router = express.Router();

/* CRUD OPERATION */
router
.get('/:articleId',async function(req,res,next){
  //get all comments for that given article id
  const {articleId}=req.params.articleId;

})
.post('/create/:articleId',async function(req,res,next){
  //get article{} from articleId and add comment to it
  const {comment}=req.body;
})


module.exports = router;