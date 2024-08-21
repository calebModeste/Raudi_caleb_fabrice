const express = require("express");
const router = express.Router();

const entityController = require("../controller/entityController");



/**===================
 *         GET
======================*/
router.get('/entities/', entityController.getEtityAll)



module.exports = router;