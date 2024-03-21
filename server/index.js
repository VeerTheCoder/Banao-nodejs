const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connectDB = require("./config/db");


dotenv.config();

const userRoute=require('./routes/userRoute')
const postRoutes=require('./routes/postRoutes')

connectDB();
const app=express()


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user',userRoute);
app.use('/api/v1/post',postRoutes);



const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server is started")
})