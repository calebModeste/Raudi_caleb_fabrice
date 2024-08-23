const express = require("express");
const router = express.Router();

const addOptionController = require("../controller/addOptionController");



/**===================
 *         GET
======================*/
router.get("/option/", addOptionController.getAddOptionAll);


router.post("/option/add", addOptionController.registerOption)

module.exports = router;