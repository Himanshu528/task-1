// // change value of variable at run time
// // var , let or const or block code values not accsessible for outside
// let a =" v";
// console.log(a)
//  a = "himanshu";
// console.log(a)
// const b = 5
// a=5
// console.log(b)
// // block scoped let variable 
// {  
//     let a = 55;
//     console.log(a)
    
// }


// // premitive data types nn bb ss u

// let c  = null
// let d = 355
// let e = true
// let f = BigInt("355") + BigInt("300")
// let g = "himanshu"
// let h = Symbol
// let i = undefined

// console.log(c, d, f, g, h,i)

// // non premitive data types -object in js key & value pair
// const item={
//    " name":" himanshu",
//     "class": 12,
//     "grade" : "z"
// }
// console.log(item)

// //practice session
// let j = "himanshu"
// let k = 27
// console.log(j+k)
// // type of j or k
// console.log(typeof (j+k))

// const a1 = { 
//     name: "shivam",
//     age : "22"
// }
// // change or update in const object is permissible
// a1['name'] = "himanshu"
// a1['friend'] = "harry"
// a1['age'] = "27"
// console.log(a1)

// // js operators and operators
// //airthmetic operators
// let c1 = 15
// let c2 = 10

// // console.log('c1+c2=' , c1+c2)
// // console.log('c1-c2= ' , c1-c2)
// // console.log('c1*c2 =' , c1*c2)
// // console.log('c1/c2 =' , c1/c2)
// // console.log('c1**c2 =' , c1**c2)
// // console.log('c1 % c2 =' , c1%c2)
// // console.log('c1++' , c1++)
// // console.log('++c2' , ++c2)
// // console.log('c1--' , c1--)
// // console.log(c1)
// // console.log('--c2' , --c2)
// //assignment operators
// c1 += 5  //same as c1 = c1+5
// console.log(c1)
// c1 -= 5
// console.log(c1)
// c1 *= 5
// console.log(c1)
// c1 /= 5
// console.log(c1)

// //comaprision operator
// let comp1 = 5
// let comp2 = 6

// console.log("comp1 == comp2" , comp1 == comp2)
// console.log("comp1 !== comp2" , comp1 !== comp2)
// console.log("comp1 === comp2" , comp1 === comp2)//triple equales show false when type will change
// console.log("comp1 != comp2" , comp1 != comp2)

// //logical operators
// let x = 10
// let y = 12
// console.log(x>y && x==10)//if both codition is true output = true , other then this condition output will be false
// console.log(x<y && x==10)
// console.log(x<y && x!==10)
// //or operator
// console.log(x>y || x==10)//if both codition is false output = false , other then this condition output will be true
// console.log(x<y || x!==10)
// console.log(x<y || x==10)
// console.log(x>y || x!==10)
// //not operator
// console.log(!false)
// console.log(!true)
// conditional operators
// if else statement

let age = 30;
//a = number.parseInt(a)
if(age<0){
    console.log('not valid age')
}else if(age>1 && age<18){
console.log('you are not eligible for driving')
}else if(age>18){
    console.log('you can drive')
}

console.log( 'done')
//ternary operator
console.log ('you can' ,  age<18? ' not drive': 'drive')

// // switch case statement

// const expr = 'orange';
// switch (expr) {
//     case 'orange':
//     console.log('ornage is 20 per peice');
//     case 'banana':
//     console.log('banana is 10 per one piece');
// //     default :
// //     console.log('fruit not match')
//  }

//  // while loop statement
// //  let n = Number//while loop continue to execute till the condition true
// //  i = 0;
// //  n = 20
// //  while(i<n){
// //  console.log(i)
// //  i++
// //  }
//  //  do while loop statement
//  let n1 = Number// first block will run then condition check if true it will continue if not it will stop
//  i = 0;
//  n = 20
//  do {
//  console.log(i)
//  i++
//  }while(i>n1)

//  // for loops in js
//  let sum = 0
//  n= 5
//  for (i = 0 ; i < n ; i++){
//     //sum += (i+1)
//  }
//  console.log("sum of first" , +n , "natural number is" , +sum)

//  // for in loop

//  let obj = {
//     harry : 90,
//     himanshu : 95,
//     shiv : 90

//  }
//  for (let a in obj){

//  console.log("marks of" + a  +  "are"  + obj [a])
//  }
//  for (let b of "himanshu"){

//  console.log(b)
//  }

// strings
let friend = "himanshu"
console.log(friend.length)
console.log(friend[2])

// template literals
let boy = "himanshu"
let girl = "meghna"
 
let sentence = `${girl} is friend of ${boy}`
console.log(sentence)

//escape sequence 
let fruit = 'app\'le'
console.log(fruit)











