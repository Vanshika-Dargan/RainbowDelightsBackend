const { Product } = require("../models");

const getproduct = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error retrieving products", error);
        res.status(404).json({error:"Error retrieving product"});
    }
}

const getproductbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({product:product,success:true});
        }
    } catch (error) {
        console.error("Error retrieving product", error);
        res.status(404).json({error:"Error retrieving product"});
    }
}

const addproduct = async (req, res) => {
    const { name, cost_per_item,weight_per_item,net_quantity, quantity_per_item,category, image, ingredients} = req.body;
    try {
        const product=await Product.create({
            name,
            net_quantity,
            quantity_per_item,
            cost_per_item,
            weight_per_item,
            category,
            image,
            ingredients,  
        });
        console.log("Product added in database");
        res.status(201).json({ product:product,message: "Product added successfully in database",success:true });
    } catch (error) {
        console.error("Error inserting product", error);
        res.status(400).json({ error: "Error inserting product" });
    }
}

const updateproduct = async (req, res) => {
    const id = req.params.id;
    const { name, cost_per_item,weight_per_item,net_quantity, quantity_per_item,category, image, ingredients} = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            await Product.update({
            name,
            net_quantity,
            quantity_per_item,
            cost_per_item,
            weight_per_item,
            category,
            image,
            ingredients,
            },{
                where: {
                  id 
                }
            }
            );
            console.log("Product updated successfully");
            res.status(200).json({ product:product,message: "Product updated successfully",success:true});
        }
    } catch (error) {
        console.error("Error updating product", error);
        res.status(400).json({ error: "Error updating product" });
    }
}

const deleteproduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            await Product.destroy({
                where: {
                  id 
                }
            });
            console.log("Product deleted successfully");
            res.status(200).json({ id:id, message: "Product deleted successfully",success:true });
        }
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(404).json({ error: "Error deleting product" });
    }
}

module.exports = {
    getproduct,
    getproductbyid,
    addproduct,
    updateproduct,
    deleteproduct
};
