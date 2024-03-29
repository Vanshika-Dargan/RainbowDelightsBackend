const express = require('express');
const productRoutes = require('./routes/productRoutes');
const chatRoutes= require('./routes/chatRoutes');
const authRouter = require('./routes/auth.js');
const cartRouter = require('./routes/cartRoutes.js');
const db = require('./models');
const cors = require('cors');
const { config } = require('dotenv');
config();
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadMiddleWare = multer({ dest: 'uploads/' });
const cookieParser = require('cookie-parser');


module.exports.uploadMiddleWare= uploadMiddleWare;

const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  }))
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api', authRouter);
app.use('/product',uploadMiddleWare.single('image'),productRoutes);
app.use('/chat',chatRoutes);
app.use('/cart',cartRouter)

app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});


app.listen(5000, async () => {
    console.log(`Server running on Port ${PORT}`);
    db.sequelize.sync({ alter: true }).then(()=>{
        console.log("Database is connected.")
    }).catch((err)=>{
        console.log("Database is not connected.")
    })
})
