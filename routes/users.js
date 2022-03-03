var express = require('express');
var router = express.Router();
const {verifyToken}=require('../middleware/auth')
var {User,Article,Comments,Likes}=require('../model/user')
const { Op } = require('@sequelize/core');
const { user } = require('pg/lib/defaults');




/* GET users listing. */
router.get('/delete/:userId',verifyToken, function(req, res, next) {
  const userId=req.params.userId
    User.destroy({where:{
        [Op.and]:{
          id:userId,
          email:req.user.email,
        }
    }}).then((val)=>{
      if(val>0){
        res.status(200).json({success:'sucessfully deleted user'})
      }
      else{
        res.status(200).json({error:'you dont have permission to delete this user'})
      }
    })
  //delete user of this userId
  //check if jwt token email matches the user id.

});

module.exports = router;
