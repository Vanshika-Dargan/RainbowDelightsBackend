import express from 'express'
import productRoutes from './routes/routes.js'

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use('/product',productRoutes);
app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
})