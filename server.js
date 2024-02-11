import express from 'express'
import productRoutes from './routes/routes.js'
import db from './models/index.js';

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());

app.use('/product',productRoutes);


app.listen(PORT,async()=>{
    console.log(`Server running on Port ${PORT}`);
    db.sequelize.sync({force:true}).then(()=>{
        console.log("Database is connected.")
    }).catch((err)=>{
        console.log("Database is not connected.")
    })
})