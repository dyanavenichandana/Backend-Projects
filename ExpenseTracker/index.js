const { Console } = require('console');
const fs= require('fs');
const { get, maxHeaderSize } = require('http');
const { parse } = require('path');


const filePath= __dirname+'/Expenses.json'; 
function readExpenses(){
 if(fs.existsSync(filePath)){
   const data=fs.readFileSync(filePath,'utf8');
   return JSON.parse(data);
 }
return [];

}

function getDate(){
  const now =new Date();
  return `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
}

function getNextId(expenses){
   const ids=expenses.map((element)=>element.id)
   return expenses.length==0?1:Math.max(...ids)+1;
}




function makeExpense(expDescription,expAmount){
const expenses=readExpenses();
   const expense={
    id:getNextId(expenses),
    description:expDescription,
    amount:parseInt(expAmount),
    date:getDate()
   }
   
   expenses.push(expense)
   writeExpenses(expenses)
   console.log(`Expense added successfully...! (ID:${expense.id})`)
}

//writing the expenses to the file
function writeExpenses(expense){
   try{ 
   fs.writeFileSync(filePath,JSON.stringify(expense,null,2),'utf8')
  
   }catch(err){
    console.error('Error writing to the file:',err);
   }


}

function expensesUserGuide(){
    console.log("USER GUIDE")
    console.log("To add a expense ------------------------------ add <description> <amount>");
    console.log("To list all the expenses ---------------------- list");
    console.log("To get summary of all expenses ---------------- summary");
    console.log("To get summary of all expenses in a month ----- summary <month number> ");
    console.log("To delete the expense ------------------------- delete <id> ");


}


//displaying the list of expenses
function displayExpenses(){
    const expenses=readExpenses();
    console.log('ID    Date    Descriprtion   Amount')
    expenses.forEach(expense => {
         console.log(`${expense.id}   ${expense.date}   ${expense.description}    ${expense.amount}`)
    });
}

//delete the expenses
function deleteExpense(id){
    const expenses=readExpenses();
    const newExpenses=expenses.filter((expense)=>expense.id!=id)
    if(newExpenses.length==expenses.length){
        console.log("No id found")
    }else{
        writeExpenses(newExpenses)
        console.log(`expense Id:${id} deleted successfully`)
    }
}
function getMonth(expense){
    const parts=expense.date.split("-");
    return parseInt(parts[1]);
}
function displaySummary(month){
    const expenses=readExpenses();
    const sum1=expenses.reduce((accumulator,currentValue)=>
    accumulator+currentValue.amount,0);
const sum2=expenses.reduce((accumulator,expense)=>{
    if(month==getMonth(expense))
   return accumulator+expense.amount
  else{
     return 0;
  }

},0);
    if(month==-1){
        console.log(`Total Expenses:${sum1}`)
    }else{
        console.log(`Total Expenses:${sum2}`)
    }
}


//reading expenses through commandline argumnets
const arguments=process.argv.slice(2);
console.log("arguments",arguments);




switch(arguments[0]){
    case 'add':
        //adding a expense
        if(arguments.length!=3){
         console.log("Insufficient Inputs")
         expensesUserGuide();
        }else{
          makeExpense(arguments[1],arguments[2]);
          
        }
        break;
    case 'list':
        displayExpenses();
        break;
    case  'delete':
        if(arguments.length!=2){
            console.log("Insufficient Inputs")
            expensesUserGuide();
        }else{
          deleteExpense(arguments[1])   
        }
     break;
    case 'summary':
        if(arguments.length==1){
            displaySummary(-1);
        }else{
            displaySummary(parseInt(arguments[1]))
        }
     break;


}