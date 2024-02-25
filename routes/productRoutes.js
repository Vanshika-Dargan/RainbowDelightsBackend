const express = require("express");
const { getproduct, getproductbyid, addproduct, updateproduct, deleteproduct } = require("../controllers/productController.js");
const route = express.Router();
const multer=require("multer");
const path=require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productImages');
    },
    filename: (req, file, cb) => {
        const productName = req.body.name.replace(/[^a-zA-Z0-9]/g, '');
        const filename = `${productName}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});


const upload=multer({
    storage :storage
})



route.get("/products", getproduct);

route.get("/:id", getproductbyid);

route.post("/add",upload.single('image'), addproduct);

route.put("/update/:id", updateproduct);

route.delete("/delete/:id", deleteproduct);

module.exports = route;

