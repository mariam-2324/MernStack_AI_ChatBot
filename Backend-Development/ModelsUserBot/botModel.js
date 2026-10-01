import mongoose, { Model } from 'mongoose';

const botSch = mongoose.Schema({
    text : {
        type : String,
        required : true,
    },
    timestamp : {
        type : Date,
        default : Date.now
    } 
})

export const BotModel = mongoose.model("BotSchema", botSch)