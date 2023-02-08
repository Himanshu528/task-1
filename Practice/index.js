const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url =  "mongodb+srv://Admin123:Admin123@cluster0.hoh9ymt.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());

mongoose.connect(url)
const con = mongoose.connection;

con.on('open' , () =>{
    console.log('mongodb is connected')
})

const sroutes = require('./routes/transroutes')
app.use('/route',sroutes)

app.listen('8080' , () => {
    console.log('server run')
})