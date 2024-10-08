const express = require("express");
const router = express.Router();

const carController = require("../controller/carController");



/**===================
 *         GET
======================*/
router.get('/cars', carController.getCarAll)
router.get('/cars/:id',carController.getCarById)


router.post('/car/push',carController.registerCar)



module.exports = router;