const express = require("express");
const router = express.Router();

const model_carController = require("../controller/model_carController");



/**===================
 *         GET
======================*/
router.get("/model_car/", model_carController.getModel_carAll);



module.exports = router;