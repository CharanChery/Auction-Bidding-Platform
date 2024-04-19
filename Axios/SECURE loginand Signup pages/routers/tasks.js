const express = require('express')
const router = express.Router()
const {gettask , createtask} = require("../controllers/tasks")

router.route('/login').post(gettask)
router.route('/signup').post(createtask)


module.exports = router