const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const url = "mongodb+srv://Admin123:Admin123@cluster0.hoh9ymt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url);

const con = mongoose.connection
con.on('open',()=>{
console.log('mongoDb connected....')
});


var imgrouter = require('./Routes/routes')
app.use('/image', imgrouter)


app.listen(3000, () =>{
    console.log("server is running at 3000")
})
