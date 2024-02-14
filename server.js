const express = require('express');
const productRoutes = require('./routes/routes.js');
const db = require('./models/index.js');
const { config } = require('dotenv');
const authRouter = require('./routes/auth.js');

config();

const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());


app.use('/product',productRoutes);
app.use('/api', authRouter);

app.listen(PORT,async()=>{
    console.log(`Server running on Port ${PORT}`);
    db.sequelize.sync({force:true}).then(()=>{
        console.log("Database is connected.")
    }).catch((err)=>{
        console.log("\n\n\nDatabase is not connected."+err.message)
    })
})