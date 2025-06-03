import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FirstName:{
        required:true,
        type:String
    },
    LastName:{
        required:true,
        type:String
    },
    Mobile:{
        required:true,
        type:String,
        unique:true
        
    },
    Password:{
        required:true,
        type:String
    },
    Age:{
        required:true,
        type:Number
    },
    Gender:{
        required:true,
        type:String
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;
