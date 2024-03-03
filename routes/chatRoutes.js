const express=require("express")
const route = express.Router();
const {searchConnection,closeConversation,getClient,queueCount,getClientCount,searchOperator,getMessage,addtoqueue,checkqueue,sendMessage}=require('../controllers/chatController')





route.get("/search_connection/:operatorName", searchConnection);

route.get("/close_conversation/:operatorName",closeConversation);


route.get("/get_client/:operatorName", getClient);




route.get("/queue_count/:userName", queueCount);

route.get("/get_client_count", getClientCount);


route.get("/search_operator/:userName",searchOperator)


route.get('/get_messages/:userName/:operator', getMessage);




route.get('/addtoqueue/:userName',addtoqueue)


route.get('/checkqueue/:userName',checkqueue)


route.post("/send_message",sendMessage)


module.exports = route;
