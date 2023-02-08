const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerSchema = new mongoose.Schema({

    username : {type : String, required : true},
    email: { type: String, required: true, unique: true },
    userId:{ type: String },
    accessToken: { type: String, default: null },
    name : {
        type: String,
        required : true,
    },
    password : {
        type : [Object],
        required : true,
    },
    emailOtp :{
        type: Number,
        default : null,    
    },
    emailOtpExpires : {type: Date, default : null },
    // token :{
    //     type: String, 
    //     required : true,     
    // },
    
    active :{
         type: 'Boolean',
         default: false,
}

});


module.exports = mongoose.model('login',registerSchema)

module.exports.hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error("Hashing failed", error);
    }
  };

  module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
      throw new Error("Comparison failed", error);
    }
  };

        
