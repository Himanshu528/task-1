const express = require('express');
const multer = require('multer')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var moment = require('moment')

const imageSchema = require('../models/image');
// multer diskstorage bascically need two para. one is destination and other is filename 
const storage = multer.diskStorage({
    // dest. means where  the file will be saved
    destination: path.join(__dirname,'./upload/images', moment().format('DD/MM/YYYY')),
    //destination: './upload/images',
    //in that destination what will be name of the file
    filename: (req, file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
// specify storage as the multer storage
const upload = multer({
    storage: storage,
    // we upoad single photo at a time for this below mwthod use
    }).single('profile');

app.use('/profile', express.static('upload/images'));

app.post('/upload',  (req, res) => {
    upload(req, res, (err) =>{
        if(err){
            console.log(err);
        }
        else{
            let image = new imageSchema({
                name : req.body.name,
                image : {
                    data : req.file.filename,
                    contentType : 'image/png'
                }
           });
            image.save().then(() =>{
                res.status(200).json({
                    message : 'Image is uploaded on mongoDb and on the server',
                    profile_url : `http://localhost:3000/profile/${req.file.filename}`
                })
            }).catch((err) =>{
                res.status(500).json({
                    message : 'Please try again, something went wrong'
                })
            })
        }

    })
   
    
});

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);


module.exports = app;