module.exports= (sequelize,DataTypes)=>{
    const QueueSystem= sequelize.define("QueueSystem",{
        userName:{
            type : DataTypes.STRING
        }

    })
    return QueueSystem;
}
