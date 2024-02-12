

export const getproduct = (req, res) => {
    const queryText = `SELECT * FROM products`;
  
    pool.query(queryText, (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(result.rows);
      }
    });
}

export const getproductbyid = (req, res) => {
    const id = req.params.id;
  
    const queryText = `SELECT * FROM products WHERE id = $1`;
  
    const queryValues = [id];
  
    pool.query(queryText, queryValues, (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.rows.length === 0) {
          res.status(404).json({ message: "Product not found" });
        } else {
          res.status(200).json(result.rows[0]);
        }
      }
    });
}

export const addproduct = (req, res) => {
    const { id, name, cost_per_item, quantity, available, category, image } =req.body;
  
    const queryText = `INSERT INTO products (id, name, cost_per_item, quantity, available, category, image) 
          VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    
    const queryValues = [
      id,
      name,
      cost_per_item,
      quantity,
      available,
      category,
      image,
    ];
  
    pool.query(queryText, queryValues, (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Data inserted successfully" });
      }
    });
}

export const updateproduct = (req, res) => {
    const id = req.params.id;
    const { name, cost_per_item, quantity, available, category, image } =
      req.body;
  
    const queryText = `
          UPDATE products 
          SET name = $1, cost_per_item = $2, quantity = $3, available = $4, category = $5, image = $6
          WHERE id = $7
      `;
  
    const queryValues = [
      name,
      cost_per_item,
      quantity,
      available,
      category,
      image,
      id,
    ];
  
    pool.query(queryText, queryValues, (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Data updated successfully");
        res.status(200).json({ message: "Data updated successfully" });
      }
    });
}

export const deleteproduct = (req, res) => {
    const id = req.params.id;
  
    const queryText = `
          DELETE FROM products WHERE id = $1
      `;
  
    const queryValues = [id];
  
    pool.query(queryText, queryValues, (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Data deleted successfully");
        res.status(200).json({ message: "Data deleted successfully" });
      }
    });
}