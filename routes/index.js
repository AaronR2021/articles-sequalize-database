var express = require('express');
var {User,Article,Comments}=require('../model/user')

const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');

var router = express.Router();

/* CRUD OPERATION */
router
.get('/',async function(req,res,next){
  //list 10 recent posts 
  res.send('user-home-page')
})
.post('/signup',async function (req,res,next){
  //sign up
  const {email,password,username}=req.body;
})
.post('/login',async function(req,res,next){
  //login with credentials
  const {email,password}=req.body;

})

module.exports = router;
