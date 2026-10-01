import mongoose from 'mongoose';


const userSch = mongoose.Schema({
    sender : {
        type : String,
        required : true,
        enum : ["user"]
    },
    text : {
        type : String,
        required : true
    },
    timestamps : {
        type : Date,
        default : Date.now
    }
    
})

export const userModel = mongoose.model("userSchema", userSch)