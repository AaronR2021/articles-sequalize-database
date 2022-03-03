const {DataTypes, NUMBER } = require('@sequelize/core');
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
});



User.prototype.validate=function(password){
    return bcrypt.compare(password,this.password)
}
User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password,10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            console.log(err);
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
        },
    
    },{
        timestamps: false,
        underscored:true
    });
    
    User.hasMany(Article,{foreignKey:'user_id',allowNull:false,onDelete:'CASCADE'})
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

Article.hasMany(Comments,{foreignKey:"Article_id",onDelete:'CASCADE'})
Comments.belongsTo(Article)



//--------------------likes--------------
const Likes = db.define('Like',
 {
    LikeId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
},{
    timestamps: false,
    freezeTableName:true,
});
User.belongsToMany(Article,{through:Likes})
Article.belongsToMany(User,{through:Likes})

Likes.sync({alter:true})
.then((data)=>{
    console.log('______________synced')})
.catch((err)=>{console.log('error syncing',err)})



module.exports = {User,Article,Comments,Likes};