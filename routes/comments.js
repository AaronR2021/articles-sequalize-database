var express = require('express');
var {User,Article,Comments}=require('../model/user')

const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');

var router = express.Router();

/* CRUD OPERATION */
router
.get('/',async function(req,res,next){
 const user=await User.create({
    email:'aaron@final.com',
    username:'aaronR',
    password:'test113'
  },{})
console.log(user.toJSON())
})
.post('/login',async function(req,res,next){
  const {email,password}=req.body;
})
.post('/signup',async function(req,res,next){})

module.exports = router;