const { Product, Cart } = require("../models")
const jwt = require('jsonwebtoken');
const {promisify} = require("util");

const getCart = async (req,res)=>{
    const token = (req.cookies.jwt);

    const {userId} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)

    const dataSet = []
    try{
        const result = await Cart.findAll({where:{userId}})
        for (const element of result) {
            let { dataValues } = await Product.findOne({where:{id:element.productId}});
            dataValues.quantity = element.quantity;
            dataSet.push(dataValues);
        }
        const count = await Cart.count({where:{userId}});
        res.status(200).send({dataSet,count})
    }catch(err){
        res.status(404).json({ error: "Error retrieving data" });
    }
}

const addCart = async (req,res)=>{
    const token = req.cookies.jwt;
    const {productId, quantity} = req.body

    if(!productId || !quantity){
        res.status(404).json({ message: "we need product id and quantity to add product in cart." });
    }

    const {userId} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
    try{
        const result = await Cart.create({productId,userId,quantity})
        const count = await Cart.count({where:{userId}});
        res.status(201).json({ product: result, message: "Product added successfully in database", success: true ,count});
    }catch(err){
        res.status(400).json({ error: "Error inserting data" });
    }
}
 
const deleteCart = async (req,res) =>{
    const {productId } = req.query;
    const token = (req.cookies.jwt);

    const {userId} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
    
    const product = await Product.findByPk(productId);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
    } else {
        await Cart.destroy({
            where: {
                productId,userId
            }
        });
        const Count = await Cart.count({where:{userId}});
        console.log("Product deleted successfully");
        res.status(200).json({ message: "Product deleted successfully", success: true,count:Count });
    }    
}


module.exports = {getCart,addCart,deleteCart}