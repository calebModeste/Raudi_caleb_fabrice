const express = require("express");
const router = express.Router();

const paymentController = require("../controller/paymentController");



/**===================
 *         GET
======================*/
router.get('/entities/', paymentController.getPaymentAll)

router.post('/payNow/', paymentController.Payed)


module.exports = router;