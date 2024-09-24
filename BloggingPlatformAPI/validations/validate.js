
 
 function titleValidation(title){
    console.log("title",title)
    if(!title){
        throw new Error("Title is required")
    }
    if(typeof(title)!=="string"){
        throw new Error("Title should be string ")
    }

    if(title.length>=30){
        throw new Error("length of the title should be less than 30 characters")
    }
}
function contentValidation(content){
    console.log("content",content)
    if(!content){
        throw new Error("content is required")
    }
    if(typeof(content)!=="string"){
        throw new Error("Title should be string ")
    }

    if(content.length>=300){
        throw new Error("length of the title should be less than 300 characters")
    }
}

function categoryValidation(category){
    console.log("category",category)
    if(!category){
        throw new Error("content is required")
    }
    if(typeof(category)!=="string"){
        throw new Error("Title should be string ")
    }

    if(category.length>=30){
        throw new Error("length of the title should be less than 30 characters")
    }
}

function tagsValidation(tags){
    console.log("tags",tags)
    if(!tags||!tags.length){
        throw new Error("tags are  required")
    }
    if(!Array.isArray(tags)){
        throw new Error("tags should be array of strings")
    }

    tags.forEach((tag) => {
        if(typeof(tag)!=='string'){
            throw new Error("each tag should be string")
        }
    });
}


 module.exports={
    titleValidation,
    contentValidation,
    categoryValidation,
    tagsValidation
 }
