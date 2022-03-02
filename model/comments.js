const {Sequelize, DataTypes } = require('@sequelize/core');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User=require('../model/user')
const Article=require('../model/article')

const Comments = db.define('Comment',
 {
    comment:{
        type:DataTypes.STRING,
    }
},{
    timestamps: false,
    underscored:true
});

Article.hasMany(Comments,{foreignKey:"Article_id"})
Comments.belongsTo(Article)
db.sync({alter:true})
.then((data)=>{
    console.log('______________synced comment')})
.catch((err)=>{console.log('+++++++++++++++++error syncing in comments',err)})

module.exports = Comments;
