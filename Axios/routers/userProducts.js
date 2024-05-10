const express = require('express')
const router = express.Router()

const {adduserProducts,getUserProducts,deleteProducts, notificationProducts , markasread} = require("../controllers/userProducts")

router.route('/adduserProducts').post(adduserProducts)
router.route('/getUserProducts').get(getUserProducts)
router.route('/deleteProducts').post(deleteProducts)
router.route('/notificationProducts').post(notificationProducts)
router.route('/markasread').post(markasread)
// router.route('/validatePayment').post(sendvalidateTransaction)


module.exports = router