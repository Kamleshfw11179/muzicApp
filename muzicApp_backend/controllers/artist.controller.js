const express = require("express")
const Artist = require("../models/artist.model")
const router = express.Router()


router.get("",async(req,res)=>{
    let data = await Artist.find()
    res.status(201).send(data)
})
router.post("",async(req,res)=>{
    let data = await Artist.create(req.body)
    res.status(201).send(data)
})
router.get("/id/:id",async(req,res)=>{
    let data = await Artist.findById(req.params.id);
    res.status(200).send(data)
})
router.get("/:release_year",async(req,res)=>{
    try{
    let data = await Artist.find({release_date:{$eq:req.params.release_year}})
    res.status(201).send(data)
    return;
    }catch(e){
        res.status(500).send("Sorry something broke.")
    }
})
router.get("/name/:name",async(req,res)=>{
    try{
    let data = await Artist.find({name:{$eq:req.params.name}})
    res.status(201).send(data)
    return;
    }catch(e){
        res.status(500).send("Sorry something broke.")
    }
})

router.patch("/update/:id",async(req,res)=>{
    let data = await Artist.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(201).send(data)
    return;
})
// router.get("",async(req,res)=>{
//     let data = await Artist.find({})
//     res.status(201).send(data)
// })
// router.get("",async(req,res)=>{
//     let data = await Artist.find({})
//     res.status(201).send(data)
// })

module.exports = router