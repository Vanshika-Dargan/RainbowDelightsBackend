const express = require("express");
const { getproduct, getproductbyid, addproduct, updateproduct, deleteproduct } = require("../controllers/productDetails.js");;

const route = express.Router();

route.get("/all", getproduct);

route.get("/:id", getproductbyid);

route.post("/add", addproduct);

route.put("/update/:id", updateproduct);

route.delete("/delete/:id", deleteproduct);

module.exports = route;
