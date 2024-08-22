const express = require("express");
const router = express.Router();

const car_optionController = require("../controller/car_optionController");



/**===================
 *         GET
======================*/
router.get("/car_option/", car_optionController.getCar_optionAll);



module.exports = router;