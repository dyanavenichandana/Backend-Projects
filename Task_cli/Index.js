const fs=require("fs");

const path=require("path");


const tasksFilePath = path.join(__dirname, "tasks.json");

//function to read tasks from the JSON tasks
function readTasks(){
    
    if(fs.existsSync(tasksFilePath)){
        const data=fs.readFileSync(tasksFilePath,"utf8");
        return JSON.parse(data);
    }
    return [];
}

//function to wrtre the tasks
function writeTasks(tasks){
    fs.writeFileSync(tasksFilePath,JSON.stringify(tasks,null,2),"utf8");

}

//function to generate the id
function getId(tasks){
   const ids=tasks.map((task)=>task.id);
    return ids.length>0?Math.max(...ids)+1:1;
}


//function to list taks by status
function listTasks(status){
    const tasks=readTasks();
 
    let taskfiltered=tasks;
    if(status){
        if(status.toLowerCase()==="done"){
            taskfiltered=tasks.filter((task)=>task.completed);
        }else if(status.toLowerCase()==="to-do"){
            taskfiltered=tasks.filter((task)=>task.inProgress==false);
        }else if(status.toLowerCase()==="in-progress"){
            taskfiltered=tasks.filter((task)=>task.inProgress);
        }else{
            console.log("Invalid Status! use 'done', 'to-do','in-Progress'");
        }
    }
    if(taskfiltered.length==0){
        console.log("no tasks are provided");
    }else{
     console.log("Id\tTaskdescription [status]")
     taskfiltered.forEach(element => {
        console.log(`${element.id}. \t ${element.description} [${element.completed?"Done":element.inProgress?"In-progress":"To-do"}]`)
     
     });


    }
}

//functiion to add the tasks
function AddTask(taskdes){
    let tasks=readTasks();
    let temp={
        id:getId(tasks),
        description:taskdes,
        completed:false,
        inProgress:false
    };

    tasks.push(temp)

    writeTasks(tasks)
}


//function to delete the task
function deleteTask(taskId){
    let tasks=readTasks();
    

    const updatedtasks = tasks.filter(task => task.id === parseInt(taskId));
 
    if(updatedtasks.length==tasks.length){
        console.log("Id doesn't exist..!") 
    }else{
     
       writeTasks(updatedtasks)
       console.log(`Task ${taskId} deleted Successfully..!`)
    }
    
}

//function to update the task
function updateTask(taskId,descrip){
    let tasks=readTasks();
    const task = tasks.find(task => task.id == taskId);
    
    if(task){
        console.log("Id doesn't exist..!") 
    }else{
       task["description"]=descrip;
       writeTasks(tasks);
       console.log(`Task ${taskId} status changed Successfully..!`)
    }
}
 

//function  to update the task as progress
function markInProgress(taskId){
    let tasks=readTasks();
    
    const task = tasks.find(task => task.id == parseInt(taskId));
    
    if(task){
        console.log("Id doesn't exist..!") 
    }else{
       task["inProgress"]=1;
       writeTasks(tasks);
      console.log("Task status  changed  to in-progress Successfully..!")
    }
}


//function to update the task as done
function markDone(taskId){
    let tasks=readTasks();
   
    const task = tasks.find(task => task.id == taskId);
    
    if(task){
        console.log("Id doesn't exist..!") 
    }else{
       task["completed"]=1;
       task["inProgress"]=0;
       writeTasks(tasks)
      console.log("Task status changed  to done Successfully..!")
    }
}








// command line arguments
const arguments=process.argv.slice(2)
if(arguments[0]=='add'){
    //add a task
    if(arguments.length==1){
        console.log("add the description\n 'Add task <task description>'");
    }else{
        
        AddTask(arguments[1]);
    }

}
else if(arguments[0]=='update'){
    if(arguments.length!=3){
        console.log("follow the instructions");
        console.log("update <id> <description>");
    }else{
        updateTask(arguments[2],arguments[3]);
    }
}
else if(arguments[0]=='delete'){
    if(arguments.length!=2){
        console.log("follow the instructions");
        console.log("delete <id> ");
    }else{
        deleteTask(arguments[1]);
    }
}
else if(arguments[0]=='mark-in-progress'){
    if(arguments.length<2){
        console.log("follow the instructions");
        console.log("mark-in-progress <id> ");
    }else{
        markInProgress(arguments[1])
    }
}
else if(arguments[0]=='mark-done'){
    if(arguments.length<2){
        console.log("follow the instructions");
        console.log("mark-in-progress <id> ");
    }else{
        markDone(arguments[1])
    }
}
else if(arguments[0]=='list'){
    const s=arguments.length>1?arguments[1]:"";
    listTasks(s)
}else{
    console.log("Wrong command");
    console.log(`Usage: node index.js <command> [arguments]`);
    console.log(`Commands:`);
    console.log('add <task description>            - Add a new task');
    console.log(`list [status]                     - List tasks (status: done, to-do, in-progress)`);
    console.log(`update <id> <new description>     - Update a task by ID`);
    console.log(`delete <id>                       - Delete a task by ID`);
    console.log(`mark-in-progress <id>             - Mark a task as in-progress by ID`);
    console.log(`mark-done <id>                    - Mark a task as done by ID`);
}





