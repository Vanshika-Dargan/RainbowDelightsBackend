const express = require('express');
const productRoutes = require('./routes/productRoutes');
const chatRoutes= require('./routes/chatRoutes');
const authRouter = require('./routes/auth.js');
const db = require('./models');
const cors = require('cors');
const { config } = require('dotenv');
config();

const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cors())

app.use('/api', authRouter);
app.use('/product',productRoutes);
app.use('/chat',chatRoutes);


app.listen(PORT,async()=>{
    console.log(`Server running on Port ${PORT}`);
    db.sequelize.sync({ alter: true }).then(()=>{
        console.log("Database is connected.")
    }).catch((err)=>{
        console.log("Database is not connected.")
    })
})
