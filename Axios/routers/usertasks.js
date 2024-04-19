const express = require('express')
const router = express.Router()

const {addProducts ,getDashboard,getproductdetail,getcoins} = require("../controllers/usertasks")

router.route('/addProducts').post(addProducts)
router.route('/dashboard').get(getDashboard)
router.route('/getproductdetail').get(getproductdetail)
router.route('/getcoins').post(getcoins)
//router.route('/getproductsById').get(getproductsById)

module.exports = router