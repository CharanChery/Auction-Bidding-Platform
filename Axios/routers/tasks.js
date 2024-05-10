const express = require('express')
const router = express.Router()
const {gettask , createtask, sendotp,checkUsername , checkEmail, getusername ,getallusersinfo} = require("../controllers/tasks")


router.route('/login').post(gettask)
router.route('/signup').post(createtask)
router.route('/verify-otp').post(sendotp)
router.route('/checkUsername').post(checkUsername)
router.route('/checkEmail').post(checkEmail)
router.route('/getusername').post(getusername)
router.route('/getallusersinfo').post(getallusersinfo)


module.exports = router