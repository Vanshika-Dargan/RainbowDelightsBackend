const express=require("express")
const route = express.Router();
const {searchConnection,closeConversation,getClient,queueCount,getClientCount,searchOperator,getMessage,addtoqueue,checkqueue,sendMessage}=require('../controllers/chatController')





route.get("/api/search_connection/:operatorName", searchConnection);

route.get("/api/close_conversation/:operatorName",closeConversation);


route.get("/api/get_client/:operatorName", getClient);




route.get("/api/queue_count/:userName", queueCount);

route.get("/api/get_client_count", getClientCount);


route.get("/api/search_operator/:userName",searchOperator)


route.get('/api/get_messages/:userName/:operator', getMessage);




route.get('/api/addtoqueue/:userName',addtoqueue)


route.get('/api/checkqueue/:userName',checkqueue)


route.post("/api/send_message",sendMessage)


module.exports = route;
