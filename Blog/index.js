const {readArticles } = require('./Article');
const express=require('express')
const path=require('path')
const fs=require('fs');
const sessions = require('express-session');
const methodOverride = require('method-override');
const adminRouter=require("./routers/adminroute");


const port=3000
const app=express();
const memoryStore = new sessions.MemoryStore();

app.use(methodOverride('_method'));

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.json())

const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};



app.use(
    sessions({
      key: 'session.sid',
        secret:'secret123',
        cookie:{
            maxAge:1000*60*60*24,
            secure: process.env.NODE_ENV === 'production',
        },
        resave:false,
        saveUninitialized:false,
        store:memoryStore
  })
  
);


app.use('/admin',LoginHandler,adminRouter);

//login handler
function LoginHandler(req,res,next){ 
  console.log(req.method)
  console.log(req.session)
  console.log('In-Memory Sessions:', memoryStore.sessions); 
  if(!req.session.userid){
    return res.redirect('/login');
  }
  next()
}



//middleware for login process
app.post('/process-login',(req,res)=>{
    if(req.body.username!=='admin'||req.body.password!=='123'){
        return res.send('Invalid username or password');
    }
    req.session.userid = req.body.username;
  
    res.redirect('/admin/')
})

// admin login
app.get('/login',(req,res)=>{
    res.render('Form/Form');
})

// admin log-out
// app.get('/logout',(req,res)=>{
//     req.session.destroy();
//     res.send(`
//     <script>
//       alert('You have been logged out successfully');
//       window.location.href = '/'; // Redirect to the homepage after the alert
//     </script>
//   `);
// })









//public-routes

app.get('/home',(req,res)=>{
    const articles=readArticles();
    res.render('home',{articles})
})

app.get('/article/:id',(req,res)=>{
    const articles=readArticles();
    const id=req.params.id;
  const article = articles.find(element => element.id ==id);
    console.log(article)
    res.render('article',{article})
})







//listening to the port
app.listen(port,()=>{
    console.log("server is listening to port")
})