const express = require("express")
const Album = require("../models/album.model")
const router = express.Router()


router.get("/:size",async(req,res)=>{
    const count = req.params.size
    let offset = (count-1)*8
    let data = await Album.find().populate("artist").populate("songs").skip(offset).limit(8)
    res.status(201).send(data)
    return;
})
router.get("/albums/all",async(req,res)=>{
    let data = await Album.find();
    res.status(201).send(data)
})
router.post("",async(req,res)=>{
    let data = await Album.create(req.body)
    res.status(201).send(data)
})
router.get("/year/:release_year",async(req,res)=>{
    try{
    let data = await Album.find({release_date:{$eq:req.params.release_year}})
    res.status(201).send(data)
    return;
    }catch(e){
        res.status(500).send("Sorry something broke.")
    }
})
router.get("/name/:name",async(req,res)=>{
    try{
    let data = await Album.find({name:{$eq:req.params.name}}).populate("artist").populate("songs")
    res.status(201).send(data)
    return;
    }catch(e){
        res.status(500).send("Sorry something broke.")
    }
})
router.get("/artistname/:artistname",async(req,res)=>{
    try{
        let data =  await Album.find().populate("artist").populate("songs")
      let arr = [];
      for(var i=0;i<data.length;i++){
          if(data[i].artist.name==req.params.artistname){
              arr.push(data[i])
          }
      }
      res.status(201).send(arr)
    }catch(err){
        console.log(err)
    }
})
router.get("/genre/:genre",async(req,res)=>{
    let data = await Album.find({genre:{$eq:req.params.genre}})
    res.status(201).send(data)
})
router.patch("/:id",async(req,res)=>{
    let data = await Album.findOneAndUpdate(req.params.id,req.body)
    res.status(302).send(data)
})
router.get("/total/count",async(req,res)=>{
    let data = await Album.find().countDocuments();
    res.status(201).send({count:data})
    return;
})
router.delete("/album/:name",async(req,res)=>{
    let data = await Album.findOneAndDelete({name:{$eq:req.params.name}})
    res.status(201).send(data)
})

module.exports = router