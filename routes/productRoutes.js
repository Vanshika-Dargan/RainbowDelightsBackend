const express = require("express");
const { getproduct, getproductbyid, addproduct, updateproduct, deleteproduct, productSearch, 
    addBaseFlavour, addDecoration, addTopping, addWeight,
    getBaseFlavour,getDecoration,getTopping, getWeight } 
    = require("../controllers/productController.js");
    
const route = express.Router();
const bodyParser = require('body-parser');


route.use(bodyParser.urlencoded({ extended: true }));

route.use(bodyParser.json());

route.get("/products", getproduct);

route.get("/productsSearch/:id", productSearch);

route.get("/products/:id", getproductbyid);

route.post("/add" , addproduct);

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

