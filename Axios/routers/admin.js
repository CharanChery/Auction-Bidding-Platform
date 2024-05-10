const express = require('express')
const router = express.Router()
const {getallusersinfo , getallitemsinfo ,deleteproducts,deleteuser} = require("../controllers/admin")

router.route('/getallusersinfo').get(getallusersinfo)
router.route('/getallitemsinfo').get(getallitemsinfo)
router.route('/deleteproducts').post(deleteproducts)
router.route('/deleteuser').post(deleteuser)



module.exports = router