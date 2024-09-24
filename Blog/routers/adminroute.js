const { application } = require("express");
const {readArticles, updateArticle,makeArticle,deleteArticle } =require( "../Article.js");

const express=require("express");

const router=express.Router();


router.get('/',(req,res)=>{
    const articles=readArticles();
 
    res.render("admin/adminHome",{articles})

})

router.get('/edit/:id',(req,res)=>{
    const id=req.params.id;
    const articles=readArticles()
    const article=articles.find((element)=>element.id==id)

    res.render("admin/editArticle",{article})
})

router.put('/edit/:id',(req,res)=>{
 
    const id=req.params.id;
    
    const content=req.body.content;
    const title=req.body.title;
 
    updateArticle(id,title,content);
    req.session.isLoggedIn = true;
    res.redirect('/admin/');

})
router.get('/new',(req,res)=>{
    
    res.render('admin/newArticle')
})
router.post('/new',(req,res)=>{
    const {articleName,articleDescription}=req.body;
   
    makeArticle(articleName,articleDescription);
    req.session.isLoggedIn = true;
   
    res.redirect('/admin/')
})

router.delete('/delete/:id',(req,res)=>{
    const id=parseInt(req.params.id);
 
    deleteArticle(id);
    req.session.isLoggedIn = true;
    res.send(`
    <script>
      alert('Article deleted Successfully...!');
      window.location.href = '/admin/'; //
    </script>
  `);
   
})

module.exports=router