const {User_Client_Connection, Message, Queue_System} = require("../models");


const search_connection =  async (req, res) => {

    const operator_name = req.params.operator_name;
    User_Client_Connection.findAll({where : {operator : operator_name}}).then((result)=>{
        res.json(result[0]["username"]);
        console.log("running...");
    }).catch((err) =>{
        console.log(err);
    })
}




const close_conversation =  async (req, res) => {

        const operator_name = req.params.operator_name;
        User_Client_Connection.destroy({where :{operator: operator_name}})
            .then((result)=>{
                Message.destroy({where :{operator:operator_name}})
                res.json("successful");
            })
}


const get_client= async (req, res) => {
    try {
        const operator_name = req.params.operator_name;

        // Assuming `Queue_System` and `User_Client_Connection` are Sequelize models
        const result = await Queue_System.findOne();

        if (!result) {
            return res.status(404).json({error: "No client found"});
        }

        const createdUserClient = await User_Client_Connection.create({
            username: result.username,
            operator: operator_name
        });

        await Queue_System.destroy({where: {username: result.username}});

        res.json(createdUserClient.username);
    } catch (err) {
        console.error('Error fetching client:', err);
        res.status(500).json({error: "Internal server error"});
    }
}


const queue_count = async (req, res) => {
    const username = req.params.username;


    Queue_System.findAll().then((result)=>{
        let count=0;
        for (let i in result){
            count+=1
            if (result[i]["username"]===username){
                break
            }
        }

        res.json(count);
    }).catch((err)=>{
        console.log(err);
    })

}


const get_client_count=async (req, res) => {
    const username = req.params.username;


    Queue_System.findAll().then((result)=>{


        res.json(result.length);
    }).catch((err)=>{
        console.log(err);
    })


}


const search_operator= (req,res)=>{
    const username = req.params.username;
    User_Client_Connection.findAll({where :{ username : username}}).then((result)=>{
        res.json(result[0]);
    }).catch((err)=>{
        res.json("no data");
    })

}


const get_message= (req, res) => {
    // Extracting username and operator from request parameters
    const { username, operator } = req.params;


    // Finding messages based on username and operator
    Message.findAll({
        where: {
            operator: operator,
            username: username
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
    const { username }=req.params;
    console.log(username);
    Queue_System.create({
        username : username
    }).catch((err)=>{
        console.log(err);
    })
}



const checkqueue= (req,res)=>{
    const username=req.params.username;
    Queue_System.findAll({where :{ username :username}}).then((result)=>{
        res.json(result)
    })
        .catch((err)=>{
            console.log(err);
        })
}


const send_message= (req,res)=>{
    const { username, operator, user_type, message } = req.body;
    // Now you can access username, operator, user_type, and message here
    Message.create({
        username:username,
        operator:operator,
        user_type:user_type,
        message:message
    }).catch((err)=>{
        console.log(err);
    })
}




module.exports = {search_connection, close_conversation,get_client,queue_count,get_client_count,search_operator,get_message,addtoqueue,checkqueue,send_message};
