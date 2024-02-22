module.exports= (sequelize,DataTypes)=>{
    const QueueSystem= sequelize.define("QueueSystem",{
        username:{
            type : DataTypes.STRING
        }

    })
    return QueueSystem;
}
