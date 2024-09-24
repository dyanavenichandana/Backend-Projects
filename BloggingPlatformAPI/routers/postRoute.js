const express=require('express')
const Post=require('../models/post')

const router=express.Router()


//craete the post
router.post('/',async(req,res)=>{
    try{
       //validating the request
       if(!req.body.title||!req.body.content||!req.body.category||!req.body.tags){
        return res.status(400).send({
            message:"please send all the required fields"
        })
       }
        
        const newPost=new Post({
         title:req.body.title,
        content:req.body.content,
        category:req.body.category,
        tags:req.body.tags.map((tag)=>tag.toLowerCase()),
        createdAt:Date.now(),
        updatedAt:Date.now()
     })
 
    const savedPost=await newPost.save();
    res.status(201).json(savedPost);
    }
    catch(error){
     res.status(500).json({
        message:error.message
     })
    }
})

//
router.put('/:id',async(req,res)=>{
   
    try{
        const id=parseInt(req.params.id);
        if(!req.body.title||!req.body.content||!req.body.category||!req.body.tags){
            return res.status(400).send({
                message:"please send all the required fields"
            })
        }
        const existingPost= await Post.findOne({id:id});
        existingPost.title=req.body.title;
        existingPost.content=req.body.content;
        existingPost.category=req.body.category;
        existingPost.tags=req.body.tags;
        existingPost.updatedAt=Date.now();
        if(!existingPost){
           return res.status(404).json({"message":"post not found"})
        }
        const updatedPost=await existingPost.save()
        return res.status(200).json(updatedPost)
    }catch(error){
        res.status(500).send({
            message:err.message
        });
    }
    
})


router.delete('/:id',async(req,res)=>{
    try{
    const id=parseInt(req.params.id);
    const deletedPost= await Post.findOneAndDelete({id:id});
    if(!deletedPost){
       return res.status(404).json({message:'Post not found'});
    }
    res.status(204)
}catch(err){
    res.status(500).send({
        message:err.message
    })
}
})
router.get('/',async(req,res)=>{
    try{
    const searchTerm=req.query.term;
    const posts=await Post.find();
    if(searchTerm){
        const filteredPosts=posts.filter((post)=>post.tags.includes(searchTerm.toLowerCase()))
        if(filteredPosts.length===0){
          return   res.status(200).send({
                message:"No results found"
            })
        }
       return  res.status(200).json(filteredPosts)
    }
   res.status(200).json(posts)
    }catch(err){
        res.status(500).send({
     
            message:err.message
           
        })
    }
})


router.get('/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const post= await Post.findOne({id:id});
    if(!post){
        return res.status(404).json({message:"Post not found"});
    }
    res.status(200).json(post)
}catch(err){
    return res.status(500).send({
        message:err.message
    })
}
})






module.exports=router