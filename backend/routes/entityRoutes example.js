const express = require("express");
const router = express.Router();

const entityController = require("../controller/entityController example");



/**===================
 *         GET
======================*/
router.get('/entities/', entityController.getEtityAll)



module.exports = router;