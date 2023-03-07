const express = require("express");
const {
  registerController,
  showAll,
  loginUser,
  deleteUser,
} = require("../controllers/controllerUsers");

const router = express.Router();
router.get("/show", showAll);
router.post("/register", registerController);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

module.exports = router;
