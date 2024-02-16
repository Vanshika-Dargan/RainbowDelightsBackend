const express=require("express")
const route = express.Router();
const {search_connection,close_conversation,get_client,queue_count,get_client_count,search_operator,get_message,addtoqueue,checkqueue,send_message}=require('../controllers/chatController')





route.get("/api/search_connection/:operator_name", search_connection);

route.get("/api/close_conversation/:operator_name",close_conversation);


route.get("/api/get_client/:operator_name", get_client);




route.get("/api/queue_count/:username", queue_count);

route.get("/api/get_client_count", get_client_count);


route.get("/api/search_operator/:username",search_operator)


route.get('/api/get_messages/:username/:operator', get_message);




route.get('/api/addtoqueue/:username',addtoqueue)


route.get('/api/checkqueue/:username',checkqueue)


route.post("/api/send_message",send_message)


module.exports = route;
