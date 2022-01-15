const mongoose = require("mongoose")
const connect = () =>{
    console.log("Connected to local database.")
    return mongoose.connect("mongodb://localhost:27017/music")
}

module.exports = connect