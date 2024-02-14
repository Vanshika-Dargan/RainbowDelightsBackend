const {Products} = require("../models")

const getproduct = (req, res) => {
    Products.findAll().then((result)=>{
      res.status(200).json(result);
    }).catch((err)=>{
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    })
}

const getproductbyid = async (req, res) => {
    const id = req.params.id;

    Product.findByPk(id).then(( result)=> {
      if (!result) {
        res.status(404).json({ message: "Product not found" });
      }else{
          res.status(200).json(result);
      }
    }).catch ((error)=> {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    })
};

const addproduct = async (req, res) => {
  const { name, cost_per_item, quantity, available, category, image } = req.body;

  Products.create({
          name,
          cost_per_item,
          quantity,
          available,
          category,
          image,
  }).then((result)=>{
      
      console.log("Data inserted successfully");
      res.status(200).json({ message: "Data inserted successfully", product: result });
  }).catch((error)=> {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
  })
};

const updateproduct = async (req, res) => {
  const id = req.params.id;
  const { name, cost_per_item, quantity, available, category, image } = req.body;

  Products.update({
          name,
          cost_per_item,
          quantity,
          available,
          category,
          image,
    }, {
          where: { id }
    }).then((result)=>{
      
        if (!result) {
            console.log("No data found to update");
            res.status(404).json({ message: "Product not found" });
        } else {
            console.log("Data updated successfully");
            res.status(200).json({ message: "Data updated successfully" });
        }
    }).catch ((error)=> {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Internal server error" });
    })
};

const deleteproduct = async (req, res) => {
  const id = req.params.id;

  Product.destroy({ where: { id: id }}).then((result)=>{
      
      if (!result) {
          console.log("No data found to delete");
          res.status(404).json({ message: "Product not found" });
      } else {
          console.log("Data deleted successfully");
          res.status(200).json({ message: "Data deleted successfully" });
      }
  }).catch ((error)=> {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
  })
};

module.exports = { getproduct, getproductbyid, addproduct, addproduct, updateproduct, deleteproduct};