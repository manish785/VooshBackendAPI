const express=require('express');
const router=express.Router();
const User=require('../models/User');
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');



//REGISTER API
router.post('/add-user',async(req,res)=>{
    const newUser=await new User({
        name:req.body.name,
        phone_number:req.body.phone_number,
        password:CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    
    try{
        const savedUser=await newUser.save();
        return res.status(201).json(savedUser);
    }catch(err){
       return res.status(500).json(err);
    }
})

//LOGIN API
router.post('/login-user',async(req,res)=>{
    try{
         const user=await User.findOne({phone_number:req.body.phone_number});
         if(!user){
             return res.status(401).json('Wrong Credentials');
         }

         const hashedPassword=CryptoJS.AES.decrypt(
             user.password,
             process.env.PASS_SEC
         )
         
         const OriginalPassword=hashedPassword.toString(CryptoJS.enc.Utf8);
         if(OriginalPassword!==req.body.password)
           return res.status(401).json('Wrong Credentials');

         const accessToken=jwt.sign(
             {
                id:user._id
             },
             process.env.JWT_SEC,
             {expiresIn:"2d"}
         );


        const {password, ...others} = user._doc;
        return res.status(200).json({...others, accessToken});
    }catch(err){
        return res.status(500).json(err);
    }
})










module.exports=router;