const {UserClientConnection, Message, QueueSystem} = require("../models");


const searchConnection =  async (req, res) => {

    const operatorName = req.params.operatorName;
    UserClientConnection.findAll({where : {operator : operatorName}}).then((result)=>{
        res.json(result[0]["username"]);

    }).catch((err) =>{
        console.log(err);
    })
}




const closeConversation =  async (req, res) => {

        const operatorName = req.params.operatorName;
        UserClientConnection.destroy({where :{operator: operatorName}})
            .then((result)=>{
                Message.destroy({where :{operator:operatorName}})
                res.json("successful");
            })
}


const getClient= async (req, res) => {
    try {
        const operatorName = req.params.operatorName;

        // Assuming `Queue_System` and `User_Client_Connection` are Sequelize models
        const result = await QueueSystem.findOne();

        if (!result) {
            return res.status(404).json({error: "No client found"});
        }

        const createdUserClient = await UserClientConnection.create({
            username: result.username,
            operator: operatorName
        });

        await QueueSystem.destroy({where: {username: result.username}});

        res.json(createdUserClient.username);
    } catch (err) {
        console.error('Error fetching client:', err);
        res.status(500).json({error: "Internal server error"});
    }
}


const queueCount = async (req, res) => {
    const userName = req.params.userName;


    QueueSystem.findAll().then((result)=>{
        let count=0;
        for (let i in result){
            count+=1
            if (result[i]["username"]===userName){
                break
            }
        }

        res.json(count);
    }).catch((err)=>{
        console.log(err);
    })

}


const getClientCount=async (req, res) => {
    const userName = req.params.userName;


    QueueSystem.findAll().then((result)=>{
        res.json(result.length);
    }).catch((err)=>{
        console.log(err);
    })


}


const searchOperator= (req,res)=>{
    const userName = req.params.userName;
    UserClientConnection.findAll({where :{ username : userName}}).then((result)=>{
        res.json(result[0]);
    }).catch((err)=>{
        res.json("no data");
    })

}


const getMessage= (req, res) => {
    // Extracting username and operator from request parameters
    const { userName, operator } = req.params;


    // Finding messages based on username and operator
    Message.findAll({
        where: {
            operator: operator,
            username: userName
        }
    })
        .then((result) => {
            // Sending the result as JSON response
            res.json(result);
        })
        .catch((err) => {
            // Sending the error as JSON response
            res.json(err);
        });
}


const addtoqueue= (req,res)=>{
    const { userName }=req.params;
    QueueSystem.create({
        username : userName
    }).catch((err)=>{
        console.log(err);
    })
}



const checkqueue= (req,res)=>{
    const { userName }=req.params;
    QueueSystem.findAll({where :{ username :userName}}).then((result)=>{
        res.json(result)
    })
        .catch((err)=>{
            console.log(err);
        })
}


const sendMessage= (req,res)=>{
    const { userName, operator, user_type, message } = req.body;
    console.log(user_type,"random");
    Message.create({
        username:userName,
        operator:operator,
        userType:user_type,
        message:message
    }).catch((err)=>{
        console.log(err);
    })
}




module.exports = {searchConnection, closeConversation,getClient,queueCount,getClientCount,searchOperator,getMessage,addtoqueue,checkqueue,sendMessage};
