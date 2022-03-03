var express = require('express');
var {User,Article,Comments}=require('../model/user')

const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');

var router = express.Router();

/* CRUD OPERATION */
router
.post('/create',async function(req,res,next){
//accept jwt token find the user id from its email<== for that user{} create article
const {title,desc}=req.body;
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
