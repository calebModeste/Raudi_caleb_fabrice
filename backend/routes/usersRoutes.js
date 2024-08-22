const express = require("express");
const router = express.Router();

const usersController = require("../controller/usersController");



/**===================
 *         GET
======================*/
router.get('/users', usersController.getUserAll)
router.get('/users/:id',usersController.getUserById)



module.exports = router;