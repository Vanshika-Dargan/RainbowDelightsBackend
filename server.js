const express = require('express');
const productRoutes = require('./routes/routes.js');
const db = require('./models/index.js');




const chatRoute= require('./routes/chatRoutes');

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());

app.use('/product',productRoutes);
app.use('/chat',chatRoute);


app.listen(PORT,async()=>{
    console.log(`Server running on Port ${PORT}`);
    db.sequelize.sync({force:true}).then(()=>{
        console.log("Database is connected.")
    }).catch((err)=>{
        console.log("Database is not connected.")
    })
})

// db.sequelize.sync().then((req)=>{
//     http.listen(1000, () => {
//         console.log("Listening....");
//     });
// })
