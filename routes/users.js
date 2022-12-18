const express = require("express");

const userController = require("../controllers/users.js");

const router = express.Router();

router.post("/add-user", userController.postAddUser);

router.get("/get-users", userController.getAllUsers);

router.post("/delete-user/:id", userController.deleteUser);

router.get("get-users/:id", userController.getUser);

module.exports = router;
