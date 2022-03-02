var express = require('express');
var User=require('../model/user')
const { Sequelize } = require('sequelize');
const { Op } = require('@sequelize/core');

var router = express.Router();

/* CRUD OPERATION */
router
.get('/', async function(req, res, next) {
 //____________Read all values of postgresql in ascending value
  /*          let value=await User.findAll({ 
           //order by decending age
           order:[['age','DESC']],
           //display certain attributes
           attributes:['username','age'],
           //under certain conditions
           where:{
             
               age:{
                 //age is less than 30
                 [Op.lt]:30
               }
             
           }
          })
        console.log(value)
        res.json(value)  */


 //___________Read all but display certain attribute values of result
      //['username','name']==> username is displayed as name
         /* let value=await User.findAll({
          attributes:[['username','name'],'age']
        })
        console.log(value)
        res.json(value)  */

//__________find max age and userinfo
      /* let maxage=await User.findAll({attributes:[
        [Sequelize.fn('MAX',Sequelize.col('age')),'oldie']
      ]})
      //saved age as a number
      let oldest_Age=maxage[0].dataValues.oldie;
      //search age info via database using where
      let oldestPerson=await User.findOne({
        where:{'age':oldest_Age},
        attributes:['username','age']
                                         })
      res.json(oldestPerson)
   */

      let value=await User.findAll({attributes:['username','age']})
      res.json(value)

})
.post('/create',async (req,res,next)=>{
  //Create and save values in postgresql
      //________________option 1___________________
    //_______just create object locally
    // const user=User.build({
    //     username:'Aaron Rebelo',
    //     password:'test',
    //     age:25
    // });
    //_______save object to table
    // user.save()
    // //you have more control using the above method.
    // console.log('synced successfully');

    //________________option 2___________________
   
   /*      return  User.create({
            username:'Nancy rebelo',
            password:'passwordR',
            age:40,
            //field that it will accept.. rest it wont
            fields:['username','password','age']
           });  */   
 })
 .post('/update',async (req,res,next)=>{
  //Update save values in postgresql
  let user=await User.update({username:'Aaron-Rebelo'},{where:{username:'aaron rebelo'}})
  res.json(user)

  //returns the number of rows modified

 }).
 post('/delete',async (req,res,next)=>{
  //Delete value in postgresql
  User.destroy({where:{age:22}}).then(data=>res.json(data)).catch((err)=>{console.log(err)})
  //returns the number of rows deleted
 });

module.exports = router;
