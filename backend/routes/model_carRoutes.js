const express = require("express");
const router = express.Router();

const model_carController = require("../controller/model_carController");
const { register } = require("../controller/usersController");



/**===================
 *         GET
======================*/
router.get("/model_car/", model_carController.getModel_carAll);


router.post("/model_car/add", model_carController.pushNewModel)

module.exports = router;