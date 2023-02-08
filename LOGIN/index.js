// const dotenv = require("dotenv");
// require("dotenv").config();
// const express = require('express');
// const app = express()
// const mongoose = require('mongoose');
// const router  = express.Router()
// const url = "mongodb+srv://Admin123:Admin123@cluster0.hoh9ymt.mongodb.net/?retryWrites=true&w=majority";
// var bodyParser = require('body-parser')
// app.use(bodyParser.json())

// app.use(express.json());

// mongoose.connect(url)
//  const con = mongoose.connection;

// con.on('open', ()=>{
//     console.log(' mongodb connected')
// });

// const sroutes = require('./routes/registerroute')
// const mroutes = require('./routes/transactions')
// const aroutes = require('./routes/authroute')
// app.use('/route',mroutes)
// app.use('/route',aroutes)


// app.listen('3000',()=>{
//     console.log(' server run on 3000...')
// })

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = "mongodb+srv://Admin123:Admin123@cluster0.hoh9ymt.mongodb.net/?retryWrites=true&w=majority";
const registerroute = require('./routes/registerroute')
const bodyPar = require("body-parser");

app.use(bodyPar.urlencoded({ extended: true }));
app.use(bodyPar.json());

mongoose.connect(url)
 const con = mongoose.connection;

con.on("open" , () => {
    console.log("Mongodb connected")
})


app.use("/user", registerroute);



app.listen("3000" , () => {
    console.log("server runing on 3000")
})


const radius = [1, 2, 3, 4];
//console.log(radius[2])
var areadata = []
var circumferencedata = []
var diameterdata = []
for(let i=0 ; i <radius.length ; i++){
    var values = radius[i]
    const area = 3.14*(values*values)
    areadata.push(area)
    const circumference =2*3.14*values
    circumferencedata.push(circumference)
    const diameter = 2*values
    diameterdata.push(diameter)
}
console.log("area of circle" + " is " , areadata)
console.log(circumferencedata)
console.log(diameterdata)


//user1data.accounts.forEach((item) => { 
    //           //console.log("x" , item)
    //           if(item.tokenBalance != undefined ){
    //             data.push(item.tokenBalance)  
    //             var bal = item.tokenBalance
    //            // var bal1 = bal.filter((item) => i)
    //            for (let i = 0; i < data.length; i++){
    //             var sym = data[i].USDT_TRC20


    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    function filterOdd(arr) {
      const filteredArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
          filteredArr.push(arr[i]);
        }
      }
      return filteredArr;
    }
    console.log(filterOdd(arr));

    // function filterFunction(arr, callback) {
    //     const filteredArr = [];
    //     for (let i = 0; i < arr.length; i++) {
    //       callback(arr[i]) ? filteredArr.push(arr[i]) : null;
    //     }
    //     return filteredArr;
    //   }
    //   console.log(filterFunction(arr));

// Function containing logic for filtering out odd numbers

function isOdd(x) {
    return x % 2 != 0;
  }
  
  // Function containing logic for filtering out even numbers
  
  function isEven(x) {
    return x % 2 === 0;
  }

  // For filtering out odd numbers


filterFunction(arr, isOdd)
console.log(filterFunction(arr, isOdd))
// [ 1, 3, 5, 7, 9, 11 ]

// For filtering out even numbers

filterFunction(arr, isEven)
console.log(filterFunction(arr, isEven))
// [ 2, 4, 6, 8, 10 ]