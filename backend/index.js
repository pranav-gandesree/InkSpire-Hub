const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const PORT = process.env.PORT || 1111;

// Load environment variables
dotenv.config();

// Database connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

// Middlewares
app.use(express.json()); 
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute)
app.use('/api/comments',commentRoute)




app.listen(PORT, ()=>{
    connectDb();
    console.log("port listening on",PORT )
})