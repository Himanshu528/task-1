const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

    sender : {
        type : String,
        required : true,
    },

    receiver : {
        type : String,
        required : true,
    },

    amount : {
        type : String,
        required : true,
    },

    // email : {
    //     type : String,
    //     required : true,
    //     unique : true,
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // },
});

module.exports = mongoose.model('trans' , transactionSchema)