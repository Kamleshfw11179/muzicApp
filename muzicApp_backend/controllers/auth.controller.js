const mongoose = require("mongoose")
const Artist = require("../models/artist.model");


let user;
const register = async(req,res) =>{
    try{
        const errorA= [];
        if(!req.body.email.includes("@")){
            errorA.push("Please enter a valid email.")
        }
        if(req.body.name.length<3){
            errorA.push("Username should be more than 3 charecters.")
        }
        if(req.body.image.length<5){
            errorA.push("Please enter a valid image.")
        }
        if(errorA.length!==0){
            return res.send({status:422,error:errorA})
        }
        user = await Artist.findOne({email:req.body.email});
        if(user){
            return res.send({status:400,message:"email is already taken."})
        }
        user = await Artist.create(req.body);
        res.status(200).send({message:"Artist registered successfuly.",id:user._id})
}
    catch(err){
        if(err){
            console.log(err);
        }
        res.status(500).send("Sorry for the incovinience");
    }
}

const login = async(req,res)=>{
    // console.log(req.body);
    // return
    try{
    user = await Artist.findOne({email:req.body.email});
    if(!user) return res.send({status:400,message:"Please check your email or passsword."})

    if(user.password!=req.body.password) return res.send({status:400,message:"Please check the email and password"})

    res.send({status:200,message:"Log In Successful.",name:user.name,userinfo:user});
    }catch(err){
        res.send({status:500,message:"Sorry for the inconvinience plaese try again later"})
    }
}


module.exports = {register,login};