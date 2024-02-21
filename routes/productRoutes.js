const express = require("express");
const { getproduct, getproductbyid, addproduct, updateproduct, deleteproduct } = require("../controllers/productController.js");
const route = express.Router();

const bodyParser = require('body-parser');


route.use(bodyParser.urlencoded({ extended: true }));

route.use(bodyParser.json());


route.get("/products", getproduct);

route.get("/:id", getproductbyid);

route.post("/add", addproduct);

route.put("/update/:id", updateproduct);

route.delete("/delete/:id", deleteproduct);

module.exports = route;

