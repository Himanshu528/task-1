const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const options = {
  expiresIn: "1h",
};

async function generateJwt(email, userId) {
  try {
    const payload = { email: email, id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token: token };
  } catch (error) {
    console.log(error,'error')
    return { error: true };
  }
}

module.exports = {generateJwt}