const express = require("express");
const router = express.Router();

const engineController = require("../controller/engineController");



/**===================
 *         GET
======================*/
router.get("/engine/", engineController.getEngineAll);



module.exports = router;