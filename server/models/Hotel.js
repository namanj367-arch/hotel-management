const mongoose=require("mongoose")

const hotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    city:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
    },
    hotelImage:[
        {
            image:String,
            public_id:String,
        }
    ],
    totalRooms:{
        type:Number,
        required:true,
    },
    availableRooms:{
        type:Number,
        required:true,

    },
    amenities:[
        {
            type:String
        }
    ],
    rating:{
        type:Number,
        default:0,
    }

},{timestamps:true})

module.exports=mongoose.model("Hotel",hotelSchema)