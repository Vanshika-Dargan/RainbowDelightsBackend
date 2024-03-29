const { Product, BaseFlavour, Topping, Weight, Decoration } = require("../models")
const fs = require('node:fs');
const { Sequelize, Op } = require('sequelize');

// fixed products
const getproduct = async (_, res) => {
    try {
        const product = await Product.findAll();

        const path = "http://localhost:5000/"
        let result = []
        product.forEach((items)=>{
            items.image = path+items.image.split("\\")[0]+"/"+items.image.split("\\")[1]
            result = [items,...result]
        })
        // console.log("ghj",product[0].image)
        res.status(200).send(product)
        // res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ error: "Error retrieving product" });
    }
}

const getproductbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ product: product, success: true });
        }
    } catch (error) {
        console.error("Error retrieving product", error);
        res.status(404).json({ error: "Error retrieving product" });
    }
}

const addproduct = async (req, res) => {
    const { name,
        quantityPerBox,
        price,
        weight,
        category,
        ingredients,
        description, } = req.body;
    let newPath = "";
    console.log(req.file);
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    try {
        const product = await Product.create({
            name,
            quantityPerBox,
            price,
            weight,
            category,
            image: newPath,
            description,
            ingredients
        });
        console.log("Product added in database");
        res.status(201).json({ product: product, message: "Product added successfully in database", success: true });
    } catch (error) {
        console.error("Error inserting product", error);
        res.status(400).json({ error: "Error inserting product" });
    }
}

const updateproduct = async (req, res) => {
    const id = req.params.id;
    const { name,
        quantityPerBox,
        price,
        weight,
        category,
        ingredients,
        description } = req.body;
    let newPath = "";
    console.log(req.file);
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            await Product.update({
                ...product,
                name,
                quantityPerBox,
                price,
                weight,
                category,
                ingredients,
                description,
                image: newPath == '' ? product.image : newPath
            }, {
                where: {
                    id
                }
            }
            );
            console.log("Product updated successfully");
            res.status(200).json({ product: product, message: "Product updated successfully", success: true });
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
            res.status(200).json({ id: id, message: "Product deleted successfully", success: true });
        }
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(404).json({ error: "Error deleting product" });
    }
}

const productSearch = async (req, res) => {
    const searchKey  = req.params.id;
  
    if (!searchKey) {
      return res.status(400).send({ message: 'Please provide a search query' });
    }
  
    try {
      const users = await Product.findAll({
        where: {
          name: {
            // Use the Sequelize operator for case-insensitive search (e.g., LIKE '%query%')
            [Op.iLike]: `%${searchKey}%`,
          },
        },
      });

        const path = "http://localhost:5000/"
        let result = []
        users.forEach((items)=>{
            items.image = path+items.image.split("\\")[0]+"/"+items.image.split("\\")[1]
            result = [items,...result]
        })
      return res.send(result);
    } catch (error) {
      console.error('Search error:', error);
      return res.status(500).send({ message: 'Error fetching users' });
    }
};


// user customization products of base flavour
const getBaseFlavour = async (_, res) => {
    try {
        const flavour = await BaseFlavour.findAll()
        res.status(200).send(flavour)
    } catch (error) {
        res.status(404).json({ error: "Error retrieving base flavour." });
    }
}

const addBaseFlavour = async (req, res) => {
    try {
        const { name, price, image } = req.body

        if (!name || !price || !image) {
            res.status(400).json({
                message: "name, price and image are required"
            });
        }

        const flavour = await BaseFlavour.create({ name, price, image })
        res.status(201).json({ baseFlavour: flavour, message: "Base flavour is added successfully in database", success: true });

    } catch (error) {
        res.status(400).json({ error: "Error inserting base flavour" });
    }
}

const updateBaseFlavour = async (req, res) => {
    const id = req.params.id;
    const { name, price, image } = req.body;

    if (!name && !price && !image) {
        res.status(400).json({
            message: "we required name or price or image to update"
        });
    }
    try {
        const flavour = await BaseFlavour.findByPk(id);

        if (!flavour) {
            res.status(404).json({ message: "Base flavour not found" });
        } else {
            flavour.name = (name) ? name : flavour.name;
            flavour.price = (price) ? price : flavour.price;
            flavour.image = (image) ? image : flavour.image;

            await BaseFlavour.update({ ...flavour }, { where: { id } });

            res.status(200).json({ baseFlavour: flavour, message: "Base flavour updated successfully", success: true });
        }
    } catch (error) {
        res.status(400).json({ error: "Error updating base flavour" });
    }
}

const deleteBaseFlavour = async (req, res) => {
    const id = req.params.id;
    try {
        const flavour = await BaseFlavour.findByPk(id);
        if (!flavour) {
            res.status(404).json({ message: "Base flavour not found" });
        } else {
            await BaseFlavour.destroy({ where: { id } });

            res.status(200).json({ id: id, message: "Base flavour deleted successfully", success: true });
        }
    } catch (error) {
        res.status(404).json({ error: "Error deleting base flavour" });
    }
}


// user customization products of topping
const getTopping = async (_, res) => {
    try {
        const topping = await Topping.findAll()
        res.status(200).send(topping)
    } catch (error) {
        res.status(404).json({ error: "Error retrieving topping." });
    }
}

const addTopping = async (req, res) => {
    try {
        const { name, price, image } = req.body

        if (!name || !price || !image) {
            res.status(400).json({
                message: "name, price and image are required"
            });
        }

        const topping = await Topping.create({ name, price, image })
        res.status(201).json({ topping, message: "Topping is added successfully in database", success: true });

    } catch (error) {
        res.status(400).json({ error: "Error inserting base Topping" });
    }
}

const updateTopping = async (req, res) => {
    const id = req.params.id;
    const { name, price, image } = req.body;

    if (!name && !price && !image) {
        res.status(400).json({
            message: "we required name or price or image to update"
        });
    }
    try {
        const topping = await Topping.findByPk(id);

        if (!topping) {
            res.status(404).json({ message: "Topping not found" });
        } else {
            topping.name = (name) ? name : topping.name;
            topping.price = (price) ? price : topping.price;
            topping.image = (image) ? image : topping.image;

            await Topping.update({ ...topping }, { where: { id } });

            res.status(200).json({ topping, message: "Topping updated successfully", success: true });
        }
    } catch (error) {
        res.status(400).json({ error: "Error updating topping" });
    }
}

const deleteTopping = async (req, res) => {
    const id = req.params.id;
    try {
        const topping = await Topping.findByPk(id);
        if (!topping) {
            res.status(404).json({ message: "Topping not found" });
        } else {
            await Topping.destroy({ where: { id } });

            res.status(200).json({ id: id, message: "Topping deleted successfully", success: true });
        }
    } catch (error) {
        res.status(404).json({ error: "Error deleting topping" });
    }
}


// user customization products of weight
const getWeight = async (_, res) => {
    try {
        const weight = await Weight.findAll()
        res.status(200).send(weight)
    } catch (error) {
        res.status(404).json({ error: "Error retrieving weight" });
    }
}

const addWeight = async (req, res) => {
    try {
        const { size, price } = req.body

        if (!size || !price) {
            res.status(400).json({
                message: "name and price are required"
            });
        }

        const weight = await Weight.create({ size, price})
        res.status(201).json({ weight, message: "Weight is added successfully in database", success: true });

    } catch (error) {
        res.status(400).json({ error: "Error inserting base weight" });
    }
}

const updateWeight = async (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;

    if (!name && !price) {
        res.status(400).json({
            message: "we required name or price to update"
        });
    }
    try {
        const weight = await Weight.findByPk(id);

        if (!weight) {
            res.status(404).json({ message: "Weight not found" });
        } else {
            weight.name = (name) ? name : weight.name;
            weight.price = (price) ? price : weight.price;
            weight.image = (image) ? image : weight.image;

            await Weight.update({ ...weight }, { where: { id } });

            res.status(200).json({ weight, message: "Weight updated successfully", success: true });
        }
    } catch (error) {
        res.status(400).json({ error: "Error updating weight" });
    }
}

const deleteWeight = async (req, res) => {
    const id = req.params.id;
    try {
        const weight = await Weight.findByPk(id);
        if (!weight) {
            res.status(404).json({ message: "Weight not found" });
        } else {
            await Weight.destroy({ where: { id } });

            res.status(200).json({ id: id, message: "Weight deleted successfully", success: true });
        }
    } catch (error) {
        res.status(404).json({ error: "Error deleting weight" });
    }
}

// user customization products of decoration
const getDecoration = async (_, res) => {
    try {
        const decoration = await Decoration.findAll()
        res.status(200).send(decoration)
    } catch (error) {
        res.status(404).json({ error: "Error retrieving decoration." });
    }
}

const addDecoration = async (req, res) => {
    try {
        const { name, price, image } = req.body

        if (!name || !price || !image) {
            res.status(400).json({
                message: "name, price and image are required"
            });
        }

        const decoration = await Decoration.create({ name, price, image })
        res.status(201).json({ decoration, message: "Decoration is added successfully in database", success: true });

    } catch (error) {
        res.status(400).json({ error: "Error inserting decoration" });
    }
}

const updateDecoration = async (req, res) => {
    const id = req.params.id;
    const { name, price, image } = req.body;

    if (!name && !price && !image) {
        res.status(400).json({
            message: "we required name or price or image to update"
        });
    }
    try {
        const decoration = await Decoration.findByPk(id);

        if (!decoration) {
            res.status(404).json({ message: "Decoration not found" });
        } else {
            decoration.name = (name) ? name : decoration.name;
            decoration.price = (price) ? price : decoration.price;
            decoration.image = (image) ? image : decoration.image;

            await decoration.update({ ...decoration }, { where: { id } });

            res.status(200).json({ decoration, message: "Decoration updated successfully", success: true });
        }
    } catch (error) {
        res.status(400).json({ error: "Error updating decoration" });
    }
}

const deleteDecoration = async (req, res) => {
    const id = req.params.id;
    try {
        const decoration = await Decoration.findByPk(id);
        if (!decoration) {
            res.status(404).json({ message: "Decoration not found" });
        } else {
            await Decoration.destroy({ where: { id } });

            res.status(200).json({ id: id, message: "Decoration deleted successfully", success: true });
        }
    } catch (error) {
        res.status(404).json({ error: "Error deleting decoration" });
    }
}

module.exports = {
    getproduct,
    getproductbyid,
    addproduct,
    updateproduct,
    deleteproduct,
    productSearch,
    getBaseFlavour,
    addBaseFlavour,
    updateBaseFlavour,
    deleteBaseFlavour,
    getTopping,
    addTopping,
    updateTopping,
    deleteTopping,
    getWeight,
    addWeight,
    updateWeight,
    deleteWeight,
    getDecoration,
    addDecoration,
    updateDecoration,
    deleteDecoration
};
