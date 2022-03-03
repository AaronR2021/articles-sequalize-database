const {DataTypes } = require('@sequelize/core');
const db = require('../config/database');
const bcrypt = require('bcrypt');

//_______________User Model_________________________________
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


//_______________Article Model_________________________________

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
    
    User.hasMany(Article,{foreignKey:'user_id'})
    Article.belongsTo(User);


//________________________Comments_______________________________

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

Article.sync({alter:true})
.then((data)=>{
    console.log('______________synced')})
.catch((err)=>{console.log('error syncing',err)})



//--------------------likes--------------
const Likes = db.define('Like',
 {
    LikeId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,

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

module.exports = {User,Article,Comments,Likes};