import express from 'express';
import { pool } from '../db.js'
const route=express.Router();

route.get('/',(req,res)=>{
    res.send({message:"Hello world"});
})

route.post('/add', (req, res) => {
    const { id, name, cost_per_item, quantity, available, category, image } = req.body;

    // Construct the SQL query with parameterized values to prevent SQL injection
    const queryText = `
        INSERT INTO products (id, name, cost_per_item, quantity, available, category, image) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    // Array containing the parameterized values
    const queryValues = [id, name, cost_per_item, quantity, available, category, image];

    // Execute the query
    pool.query(queryText, queryValues, (error, result) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Data inserted successfully');
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});


route.put('/update',(req,res)=>{

})

route.delete('/delete',(req,res)=>{

})

export default route;