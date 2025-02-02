const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
    },
    password:{
        type:String,
        required:[true,'Password is required'],
    },
    posts:[{
        type:mongoose.Types.ObjectId,
        ref:'Post',
    }]

},{timestamps:true})

const userModel=mongoose.model("User",userSchema);
module.exports= userModel;