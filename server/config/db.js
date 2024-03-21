const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected successful")
    }catch(error){
        console.log("Error occur",error);
    }
}

module.exports= connectDB;