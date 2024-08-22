const express = require("express");
const router = express.Router();

const usersController = require("../controller/usersController");



/**===================
 *         GET
======================*/
router.get('/users', usersController.getUserAll)
router.get('/users/:id',usersController.getUserById)
router.post('/login',usersController.login)
router.post('/register',usersController.register)



module.exports = router;