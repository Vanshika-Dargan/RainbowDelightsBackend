const express = require("express");
const { getproduct, getproductbyid, addproduct, updateproduct, deleteproduct, 
    addBaseFlavour, addDecoration, addTopping, addWeight,
    getBaseFlavour,getDecoration,getTopping, getWeight } 
    = require("../controllers/productController.js");
    
const route = express.Router();

route.get("/products", getproduct);

route.get("/products/:id", getproductbyid);

route.post("/add", addproduct);

route.put("/update/:id", updateproduct);

route.delete("/delete/:id", deleteproduct);

route.post("/addBaseFlavour", addBaseFlavour);
route.post("/addDecoration", addDecoration);
route.post("/addTopping", addTopping);
route.post("/addWeight", addWeight);
route.get("/getBaseFlavour", getBaseFlavour);
route.get("/getDecoration", getDecoration);
route.get("/getTopping", getTopping);
route.get("/getWeight", getWeight);

module.exports = route;

