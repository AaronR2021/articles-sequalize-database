const {Sequelize, DataTypes } = require('@sequelize/core');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User=require('../model/user')

const Article = db.define('Article',
 {

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    title:{
        type:DataTypes.STRING,
    },
    desc:{
        type:DataTypes.STRING,
    }

},{
    timestamps: false,
    underscored:true
});

Article.hasMany(User,{foreignKey:'user_id'})
User.belongsTo(Article)
db.sync({alter: true })
.then(()=>{
    console.log('______________ synced article')})
.catch((err)=>{
    
    console.log('+++++++++++++++++error syncing in Article',err)
})


module.exports = Article; 