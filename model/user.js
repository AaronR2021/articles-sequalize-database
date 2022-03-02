const {Sequelize, DataTypes } = require('@sequelize/core');
const db = require('../config/database');
const bcrypt = require('bcrypt');
const User = db.define('User',
 {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
        },
},{
    timestamps: false,
    instanceMethods:{
        //validate
        validate: (password)=> {
              return bcrypt.compareSync(password, this.password);
            }
        }
});

User.beforeCreate((user, options) => {
console.log('hashing password')
    return bcrypt.hash(user.password,10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});

db.sync({alter:true})
.then(()=>{
    
  console.log('______________synced successfully-User')
})
.catch((err)=>{
    console.log('+++++++++++++++++error syncing in User',err)})

module.exports = User; 