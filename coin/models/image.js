const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({

    name : {
        type: String,
        require: true
    },

    image: {
        //buffer is like binary data our image is saved in mongodb like binary data
        
        data: Buffer,
        contentType: String
    },

        
   
});

module.exports = mongoose.model('image', imageSchema);