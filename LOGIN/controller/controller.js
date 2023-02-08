const express = require('express');
const app = express();
const router = express.Router()
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const registerSchema = require('../models/registermodel');
const { v4: uuid } = require("uuid");
const { generateJwt } = require("../helpers/jwt");
var nodemailer = require('nodemailer');
const dotenv = require("dotenv");
require("dotenv").config();


function isValidateEmail(Vemail) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Vemail).toLowerCase());
  }
  function CheckPassword(password) {
    const che =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/g;
    return che.test((password));
  }
  function CheckUserName(name) {
    const che = /^[a-zA-Z0-9]{5,25}$/;
    return che.test((name));
  }
  
  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }



// var otp = Math.random();
// otp = otp * 1000000;
// otp = parseInt(otp);
// console.log(otp);


exports.register = async (req, res) => {
    try {

        const { name, userName, email, password, confirm_password } = req.body;

        if (!(userName && name && email && password && confirm_password)) {
            res.status(404).json('All input field is required');
        }

        const userExists = await registerSchema.exists({ username: userName })
        if (userExists) {
            res.status(400).json({
                statuscode: 400,
                status: "Failed",
                message: "username already Exists",
                data: {}
            });
        };

        const user = await registerSchema.findOne({ email: email })

        if (user) {
            res.status(404).json({
                statuscode: 400,
                status: "Failed",
                message: "Email already in use",
                data: {}
            });
        };

        if (password != confirm_password) {
            res.status(401).json({
                statuscode: 401,
                status: "Failed",
                message: "password mismatched"
            })
        }


        const hash = await registerSchema.hashPassword(password);
        console.log(hash, "00")

        let code = Math.floor(100000 + Math.random() * 900000);

        let expiry = Date.now() + 60 * 1000 * 120; //120 mins in ms

        var id = uuid(); //Generate unique id for the user.


        //encryptedPassword = await bcrypt.hash(password, 10);
        //console.log('firstname,lastname,username,email,password,confirm_password', req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.password,req.body.confirm_password)

        let User = new registerSchema({
            email: email,
            name: name,
            username: userName,
            password: hash,
            emailOtp: code,
            emailOtpExpires: new Date(expiry),
            userId: id

        })

        await User.save()
        res.status(200).json({
            statuscode: 200,
            status: "ok",
            message: "Registration successfully",
            data: {}
        })

    } catch (error) {
        console.error("user registererror", error)
        res.status(500).json({
            statuscode: 500,
            status: "Failed",
            message: "Can't register",
            data: {}
        })

    }
}
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user:'himanshu.saraswat.551632',
//         pass:'jwqdsokademvfrzh'  
//     }
// }); 
// var Email = {
//     from: 'himanshu.saraswat.551632@gmail.com',
//     to: User.email,
//     subject: `Hii ${User.name} your new OTP for login `,
//     html: `<h1 style='font-weight:bold; color:#6e0031'>Hey ${User.name}</h1>
//     <h3>Your accout login success!!<br> Please enter OTP </h3> 
//     <h1 style='font-weight:bold; color:#260087;'>${otp.toString()}</h1>
//     <br><p>Thank You! For using my company</p>`
// };


// transporter.sendMail(Email, function(error, info){


//     if (error) {
//         console.log(error);
//     }
//     else{
//         console.log('Email sent: ' + info.response);
//     }


// });
//     try{
//     if(User.email == User.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
//         const Users = await User.save();
//         res.status(200).json({ Users , 
//             message: 'registered succesully',
//           Users 
//         })     
//     }else{
//         res.status(404).json('email not valid')
//     }


//     }
// catch(err){
//         res.status(404).json({
//             message :'not registered',
//             err
//         })
//     }

// }catch(err){
//     res.status(404).json({
//         message : 'invalid inputs',
//         err
//     });
// }
// };

exports.login = async (req, res) => {
    try {
        var {  email, password } = req.body;
        if (!email && !password) {
            res.status(400).json({
                statuscode: 400,
                status: "Failed",
                message: "All input field is required",
                data: {}
            });
        }
         let tokenArray = []
        const user1 = await registerSchema.findOne({email : email});
        console.log(user1.password,"11")
        Object.keys(user1.password).forEach((key, count) => {
            console.log(key, user1.password[key], "11111")
            const token = {
              symbol: key,
              balance: +user1.password[key],
            }
            console.log(token, "first user")
            tokenArray.push(token)

          })
        // if(user1.length != 0){
        //     user1.forEach(element => {
        //         array.push(element.password)
        //         const data = element.password
        //         console.log(data)
        //     });
        // }
        const x = user1.password
        console.log(x)
        

        registerSchema.findOneAndUpdate({email : user1.email},{
            $push : {password : password}
        }).then(()=>{
            console.log(`new pushed`)
        }).catch((err)=>{
            console.log("err in push")
        })
        // User.findOneAndUpdate({ email: user.email }, {
        //     $push: { password: hash }
        //   }).then(() => {
        //     console.log(`new PUSHED`)
        //   }).catch((err) => {
        //     console.log(err, "errr push")
        //   })

        // let {ActivationStatus} = req.params
        // let condition = !!name ? { name: name } : { email: email }

        // let user1 = await registerSchema.findOne(condition);

        // if (!user1) {
        //     res.status(404).json({
        //         statuscode: 404,
        //         status: "Failed",
        //         message: 'Incorrect name or email',
        //         data: {}
        //     })
        // }

        if (!CheckUserName(email) && isValidateEmail(email)) {

            if (!isValidateEmail(email)) {

                return res.status(404).send({
                    statuscode: 404,
                    status: "Failed",
                    message: "Email is Invalid",
                    data: {}
                });
            }

            email = email.replace(/\s+/g, '');
            email = email.toLowerCase();

            var user = await registerSchema.findOne({ email: email });

        } else {

            if (CheckUserName(email)) {

                console.log("USERNAME")

                email = email.toLowerCase();
                var user = await registerSchema.findOne({ username: email });
            } else {

                return res.status(406).send({
                    statuscode: 406,
                    status: "Failed",
                    message: "UserName Is Invalid",
                    data: {}
                });

            }
        }
        if (!user) {
            return res.status(402).json({
                statuscode: 402,
                status: "Not Found",
                message: "Account Not Found",
                data: {},
            });
        }

        // if (!user.active) {
        //     return res.status(403).json({
        //         statuscode: 403,
        //         status: "Failed",
        //         message: "You Must Verify Your Email To Activate Your Account",
        //         data: {
        //             email: user.email
        //         },
        //     });

        // }

        const isValid = await registerSchema.comparePasswords(password, user.password[user.password.length - 1]);

        if (!isValid) {
            return res.status(401).json({
                statuscode: 401,
                status: "Failed",
                message: "Invalid Credentials",
                data: {},
            });
        }
        const { error, token } = await generateJwt(user.email, user.userId);

        if (error) {
            return res.status(501).json({
                statuscode: 501,
                status: "Error",
                message: "Couldn't create access token. Please try again later",
                data: {},
            });
        }

        user.accessToken = token;
        await user.save()
        res.status(200).json({
            statuscode: 200,
            status: "ok",
            message: "login successfull",
            accessToken: token,
            data: {}
        })
    } catch (err) {
        console.error("Login error", err);
        return res.status(500).json({
            statuscode: 500,
            status: "Error",
            message: "Couldn't login. Please try again later.",
            data: {},
        });
    }
}



//     const validPassword =  await registerSchema.findOne({password});

//     if (!validPassword) {return res.status(400).json({
//         message : 'Please enter valid password'
//     });
// }else{


//      if(user1.active){
//         const token = jwt.sign({user_id:user1._id , email}, process.env.TOKEN_KEY,{expiresIn:"2h"})
//         user1.token = token
//         res.status(200).json({
//             message : 'User is succesfully Activated and token generated ',
//             token
//         })
//      }else{
//         res.status(404).json({
//             message : 'User is not Activated, kindly activate the profile with valid OTP'
//         })
//      }


//     }
// }catch (err) {
//     console.log(err);
//     res.status(500).json({
//         message : 'Something went wrong'
//     });
//   }
// }

const activate = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        let user = await registerSchema.findOne({ email });

        if (!user) return res.status(400).send("Email not found");

        const OTP = await registerSchema.findOne({ otp });

        if (!OTP) {
            return res.status(404).send({ status: false, msg: 'otp not match activation unsucsesfull' });
        } else {
            let active = await registerSchema.updateOne({ otp }, { $set: { active: true } })
            res.status(200).json({
                message: 'user is activated',
                active
            })
        }
        //at this point, login is successfull, return the user info without the password info
        // user.password = undefined;    
        res.status(200).json({
            status: true, message: 'data match activate succesfull'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

const token = async (req, res) => {
    res.status(200).json({
        message: 'login succesful'
    })
}

//module.exports.register = register
// module.exports.login = login
// module.exports.activate = activate
// module.exports.token = token
