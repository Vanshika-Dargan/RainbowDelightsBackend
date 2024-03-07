const express = require("express");
const { getCart, addCart, deleteCart} = require("../controllers/cartController.js");
    
const route = express.Router();

route.get("/getCart",getCart);

route.post("/addCart",addCart);

route.delete("/deleteCart",deleteCart);

module.exports = route;