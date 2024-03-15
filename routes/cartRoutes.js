const express = require("express");
const { getCart, addCart, deleteCart, countCart} = require("../controllers/cartController.js");
    
const route = express.Router();

route.get("/getCart",getCart);

route.post("/addCart",addCart);

route.delete("/deleteCart",deleteCart);

route.get("/countCart",countCart)

module.exports = route;