const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');
const orderRoute=require('./routes/order');
const PORT=8080;


dotenv.config();


mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("DB connection Succesful"))
        .catch((err)=>{
        console.log(err);
});

app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/orders',orderRoute);


app.listen(process.env.port || PORT,()=>{
    console.log('Backend Server is running on port',PORT);
})