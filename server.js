const express = require('express');
const productRoutes = require('./routes/productRoutes');
const chatRoutes= require('./routes/chatRoutes');
const authRouter = require('./routes/auth.js');
const db = require('./models');
const { config } = require('dotenv');
config();
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadMiddleWare = multer({ dest: 'uploads/' });

module.exports.uploadMiddleWare= uploadMiddleWare;

const app=express();
const PORT=process.env.PORT || 1000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/api', authRouter);
app.use('/product',uploadMiddleWare.single('image'),productRoutes);
app.use('/chat',chatRoutes);


app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});


app.listen(5000, async () => {
    console.log(`Server running on Port ${PORT}`);
    db.sequelize.sync({force:true}).then(() => {
        console.log("Database is connected.");
    }).catch((err) => {
        console.log("Database is not connected.");
    });
});

