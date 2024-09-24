const mongoose=require('mongoose');
const autoIncrement=require('mongoose-sequence')(mongoose)

const postSchema=new mongoose.Schema({
   id:{
    type:Number,
    unique:true
   },
   title:{
    type:String,
    required:true
   },
   content:{
    type:String,
    required:true
   },
   category:{
    type:String,
    required:true
   },
   tags:{
    type:[String],
    required:true
   },
   createdAt:{
    type:Date,
   },
   updatedAt:{
      type:Date
   }
})

postSchema.plugin(autoIncrement,{ inc_field:'id'})
const Post=new mongoose.model("Post",postSchema)

module.exports=Post