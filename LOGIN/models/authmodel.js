const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    id : {
        type : String,
        required : true,
    },
    secret : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('authenticator', userSchema) 