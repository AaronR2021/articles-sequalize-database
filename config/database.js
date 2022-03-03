//database config
const { Sequelize } = require('sequelize');
//sequalize takes care of pg $ pg-hstore in the background..so dont worry.
const db = new Sequelize("da3iejibesgagc","stenjrhqgfasfe","c26e47d822efe87fde0e53a3ecebd3de6435bc5f7502a713e3b00544b281b776",
 {                      //database name   =>  username    =>    password//
    host: 'ec2-63-35-79-208.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',//name of the engine

    pool: {  //collection of saved reusable connections
        max: 5, //never have more than 5 open connections
        min: 0, // t a minimum, have zero open connections/maintain no minimum number of connections
        acquire: 30000,
        idle: 10000//how long will sequalize hold the connection before terminating it>> 10seconds.
        //pool.timeout is how long if no response terminate connection
    },
    //got from stack overflow. but why?-->check it out!
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
      },
    logging:false,
});

module.exports = db;