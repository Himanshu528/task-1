const express = require("express");
const router = express.Router();
const cont = require("../controller/controller")

router.post("/register" , cont.register)
router.post("/login" , cont.login)
module.exports = router;