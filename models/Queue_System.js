const {DataTypes} = require("sequelize");
module.exports= (sequelize,DataTypes)=>{
    const Queue_System= sequelize.define("Queue_System",{
        username:{
            type : DataTypes.STRING
        }

    })
    return Queue_System;
}
