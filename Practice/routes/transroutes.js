const express = require('express');
const router = express.Router()
const transact  = require('../Controller/transcontroller')

router.post('/transaction' , transact.transaction)
router.post('/balance' , transact.balance)
module.exports = router;