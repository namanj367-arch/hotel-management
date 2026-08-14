const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
    },

    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,

    },

    password:{
        type: String,
        required: true,
    
    },

    phone:{
        type:String,
        required: true,
    },

    role:{
        type: String,
        enm:["user","admin"],
        default:"user",
    }
},{timestamps: true})

module.exports=mongoose.model("User", UserSchema)