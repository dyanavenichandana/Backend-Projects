const prompt=require('prompt-sync')({sigint:true});

while(true){
console.log("\n\nWelcome to the Number Guessing game")
console.log("I'm thinking of a Number Between  1 and 100\n\n")
console.log("please select the difficulty level\n1.Easy(10 chances)\n2.Medium(5 chances)\n3.hard(3 chances)")

const choice=prompt('enter yor choice:');
const level=(choice==1)?"Easy":(choice==2)?"Medium":"Hard"

console.log(`Great! You have selected the ${level} difficulty level`)
let chances;
switch(parseInt(choice)){
case 1:
    chances=10;
    
    break;
case 2:
    chances=5
  
    break;
case 3:
    chances=3
    
    break;
}

const number=Math.floor(Math.random()*100)+1;
let f=0;
for(let i=1;i<=chances;i++){
  let guess=prompt('Enter your guess: ')
  if(guess==number){
    console.log(`Congratulations! You guessed the correct number in ${i} attempts.`)
    f=1;
  }
  else if(guess<number){
    console.log(`Incorrect! The number is greater than ${guess}`)
  }else{
    console.log(`Incorrect! The number is less than ${guess}`)
  }

}
if(f==0){
    console.log(`you run out of chances...!  The number is ${number}`)
    

}
let output=prompt('press 1 to play one more game: ')
    if(parseInt(output)!==1){
        break;
    }

}



