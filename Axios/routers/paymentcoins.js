const express = require('express')
const router = express.Router()
const {createpayment} = require("../controllers/paymentcoins")

router.route('/createpayment').post(createpayment)

module.exports = router