const {DataTypes} = require("sequelize");
module.exports= (sequelize,DataTypes)=>{
    const User_Client_Connection= sequelize.define("User_Client_Connection",{
        username:{
            type : DataTypes.STRING
        }
        ,operator:{
            type : DataTypes.STRING
        }
    })
    return User_Client_Connection;
}
