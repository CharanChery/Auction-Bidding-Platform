const express = require('express')
const router = express.Router()

const {sendvalidateTransaction} = require("../controllers/validateTransaction")

router.route('/sendvalidateTransaction').post(sendvalidateTransaction)

module.exports = router