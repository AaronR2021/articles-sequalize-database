/* const {Sequelize, DataTypes } = require('@sequelize/core');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const User=require('../model/user')
const Article=require('../model/article')

const Likes = db.define('Like',
 {
    LikeId:{
        type:DataTypes.STRING,
        defaultValue:uuidv4(),
        primarKey:true,

    },
    Like:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },

},{
    timestamps: false,
    freezeTableName:true,
    instanceMethods:{
        //decrement
        decrement: ()=> {
            return this.Like-1
          },
           //increment
        increment: ()=> {
            return this.Like+1
          
        }
    }
});
User.belongsToMany(Article,{through:Likes})

db.sync({alter:true})
.then((data)=>{console.log('synced')})
.catch((err)=>{console.log('error syncing in likes',err)})


module.exports = Likes;


/*
User.create({
    key:value
})

*/