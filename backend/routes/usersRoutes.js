const express = require("express");
const router = express.Router();

const usersController = require("../controller/usersController");
const authenticateTokken = require("../providers/middleware");

/**===================
 *         GET
======================*/
router.get("/profile", authenticateTokken, usersController.getUserProfile);
router.get("/users", authenticateTokken, usersController.getUserAll);
router.get("/users/:id", authenticateTokken, usersController.getUserById);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.post("/register", usersController.register);

module.exports = router;
