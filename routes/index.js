var express = require('express');
var User=require('../model/user')
var Article=require('../model/article')
var Likes=require('../model/likes');
var Comments=require('../model/comments')
const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');

var router = express.Router();

/* CRUD OPERATION */
router
.post('/login',async function(req,res,next){
  const {email,password}=req.body;
})
.post('/signup',async function(req,res,next){})

module.exports = router;
