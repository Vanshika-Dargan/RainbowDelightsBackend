const {DataTypes} = require("sequelize");
module.exports= (sequelize,DataTypes)=>{
    const Message= sequelize.define("Message",{
        username:{
            type : DataTypes.STRING
        }
        ,operator:{
            type : DataTypes.STRING
        },
        message:{
            type : DataTypes.STRING
        },
        user_type:{
            type :DataTypes.STRING
        }
    })
    return Message;

}
