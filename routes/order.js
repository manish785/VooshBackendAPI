const express=require('express');
const router=express.Router();
const Order=require('../models/Order');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');



router.post('/add-order',verifyToken,async(req,res)=>{
    const newOrder=await new Order({
        user_id:req.body.user_id,
        sub_total:req.body.sub_total,
        phone_number:req.body.phone_number,
    });
    
    try{
        const savedOrder=await newOrder.save();
        return res.status(201).json(savedOrder);
    }catch(err){
       return res.status(500).json(err);
    }
})

router.get('/get-order/:id',verifyToken, async(req,res)=>{
    try{
         const order=await Order.findById(req.params.id);
         return res.status(200).json(order);
    }catch(err){
        return res.status(500).json(err);
    }
})


router.get('/get-order', verifyToken, async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports=router;