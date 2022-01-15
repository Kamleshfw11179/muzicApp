const mongoose = require("mongoose")


const songSchema = new mongoose.Schema({
    name:{type:String,required:true},
    duration:{type:Number,required:true},
})


const Song = mongoose.model("songs",songSchema)


module.exports = Song
