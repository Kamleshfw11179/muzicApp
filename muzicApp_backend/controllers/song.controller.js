const express = require("express")
const Song = require("../models/song.model")
const router = express.Router()


router.get("",async(req,res)=>{
    let data = await Song.find()
    res.status(201).send(data)
})
router.post("",async(req,res)=>{
    let data = await Song.create(req.body)
    res.status(201).send(data)
})
router.get("/:release_year",async(req,res)=>{
    try{
    let data = await Song.find({release_date:{$eq:req.params.release_year}})
    res.status(201).send(data)
    return;
    }catch(e){
        res.status(500).send("Sorry something broke.")
    }
})
router.get("/name/:name",async(req,res)=>{
    try{
    let data = await Song.find({name:{$eq:req.params.name}})
    res.status(201).send(data)
    return;
    }catch(e){
        res.status(500).send("Sorry something broke.")
    }
})

router.patch("/:id",async(req,res)=>{
    let data = await Song.findOneAndUpdate(req.params.id,req.body)
    res.status(302).send(data)
})
// router.get("",async(req,res)=>{
//     let data = await Song.find({})
//     res.status(201).send(data)
// })
// router.get("",async(req,res)=>{
//     let data = await Song.find({})
//     res.status(201).send(data)
// })

module.exports = router