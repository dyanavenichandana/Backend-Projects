const express= require('express');
const mongoose=require('mongoose')
const postRoute=require('./routers/postRoute')

const PORT= 3000
const app=express();

app.use(express.json());


//connection to the database
mongoose.connect('mongodb://127.0.0.1:27017/blog',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to mongo db");
}).catch((err)=>{
    console.error(`Error connecting to MongoDB:${err}`)
})

//post router
app.use('/posts',postRoute)

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})