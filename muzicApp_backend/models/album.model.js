const mongoose = require("mongoose")


const albumSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    artist:{type:mongoose.Schema.Types.ObjectId,ref:"artist",required:true},
    total_songs:{type:Number,required:true},
    release_date:{type:Number,required:true},
    genre:{type:String,required:true},
    songs:[{type:mongoose.Schema.Types.ObjectId,ref:"songs",required:true}]
})


const Album = mongoose.model("album",albumSchema)


module.exports = Album

