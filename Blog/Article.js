const fs= require('fs');
const filePath= 'C:/projects/Backend_projects/Resources folder/Article.json' 

console.log(__dirname)
function readArticles(){
 if(fs.existsSync(filePath)){
   const data=fs.readFileSync(filePath,'utf8');
   return JSON.parse(data);
 }
return [];

}

function getDate(){
  const now =new Date();
  return `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
}

function getNextId(articles){
  const ids=articles.map((article)=>article.id)
  return articles.length==0?1:Math.max(...ids)+1;
}

function makeArticle(arTitle,arContent){
  const articles=readArticles();
     const article={
      id:getNextId(articles),
      title:arTitle,
      content:arContent,
      date:getDate()
     }
     console.log(article)
     articles.push(article)
     writeArticles(articles)
     console.log(`Article added successfully...! (ID:${article.id})`)
  }

  function writeArticles(article){
    try{ 
    fs.writeFileSync(filePath,JSON.stringify(article,null,2),'utf8')
   
    }catch(err){
     console.error('Error writing to the file:',err);
    }
 
 
 }

 function deleteArticle(id){
  console.log("delete",id,typeof(id))
  
  const articles=readArticles();
  const newArticles=articles.filter((article)=>article.id !== id);
  console.log(newArticles)
  if(newArticles.length==articles.length){
      console.log("No id found")
  }else{
      writeArticles(newArticles)
      console.log(`article Id:${id} deleted successfully`)
  }
}


 function updateArticle(arId,arTitle,arContent){
  let articles=readArticles();
  console.log("passed",arId)
  arId=parseInt(arId)
  const article = articles.find(article => article.id === arId);
  console.log(arId,typeof(parseInt(arId)))
  console.log(article)

  if(!article){
      console.log("Id doesn't exist.. Miss!") 
  }else{
     article['title']=arTitle; 
     article['content']=arContent;
     writeArticles(articles);
     console.log(`Article ${arId} status changed Successfully..!`)
  }
}

module.exports={
  readArticles,makeArticle,deleteArticle,updateArticle
}