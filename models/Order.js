const mongoose=require('mongoose');


const OrderSchema=new mongoose.Schema(
    {
        user_id:{
             type:String,
             required:true,
             unique:true
         },
         sub_total:{
             type:String,
             required:true,
             unique:true
         },
         phone_number:{
             type:String,
             required:true
         },
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Order",OrderSchema);