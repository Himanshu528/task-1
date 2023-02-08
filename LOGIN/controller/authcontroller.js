const express = require('express');
const speakeasy = require('speakeasy');
const uuid = require('uuid');
const userSchema = require('../models/authmodel')
//adding node-json-db
const  JsonDB  = require('node-json-db').JsonDB;
const  Config  = require('node-json-db/dist/lib/JsonDBConfig').Config;
const db = new JsonDB(new Config("DataBase", true, false, '/'));
const QRCode = require('qrcode');
const { text } = require('body-parser');
const router = express.Router();



const authentication =   (req, res) => {
  const id = uuid.v4();
  try {
   
    const path = `/user/${id}`;
    // Create temporary secret until it it verified
    const temp_secret = speakeasy.generateSecret();
    
    // Create user in the database
    db.push(path, { id, temp_secret });
    // Send user id and base32 key to user
   // const url = req.body.url;
       
    
    QRCode.toDataURL(temp_secret.otpauth_url, function (err, url) {
      console.log(url)
    })
    const users = new userSchema({
       id : id,
       secret : temp_secret.base32

    });
      users.save()
    res.json({ id, secret: temp_secret.base32})
  
  } catch(e) {
    console.log(e);
    res.status(404).json({ message: 'Error generating secret key'})
  }
}

const verify = ('/verify', (req, res) => {
    const { userId, token } = req.body;
    try {

      
      // Retrieve user from database
      const path = `/user/${userId}`;
      const user = db.getData(path);
      console.log({ user })
      const { base32: secret } = user.temp_secret;
      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token
      });
      if (verified) {
        // Update user data
        db.push(path, { id: userId, secret: user.temp_secret });
        res.json({ verified: true })
      } else {
        res.json({ verified: false})
      }
    } catch(error) {
      console.error(error);
      res.status(404).json({ message: 'Error retrieving user'})
    };
  })


const validate = ('/validate', (req, res) => {

    const {token, userId} = req.body;   
    try {
      // Retrieve user from database
      const path = `/user/${userId}`
      const user = db.getData(path)
    
      const { base32: secret } = user.secret;
      const tokenValidate = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token, 
        window:1 // time window 
      });
      
    
      if (tokenValidate) {  
        
        res.json({ validated: true })
      } else {
        res.json({ validated: false})
      }
    }catch(error) {
      console.error(error)
      res.status(404).json({ message: "Error retrieving user!"})
    };
  })

module.exports.authentication = authentication
module.exports.verify = verify
module.exports.validate = validate

 