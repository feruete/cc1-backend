const express = require("express");
const {
  registerController,
  showAll,
  loginUser,
  deleteUser,
} = require("../controllers/controllerUsers");
const {
  userValidator,
  loginValidator,
  verifyToken,
} = require("../validators/validatorsUsers");
const { runValidation } = require("../validators/index");

const router = express.Router();
router.get("/show", showAll);
router.post("/register", userValidator, runValidation, registerController);
router.post("/login", loginValidator, runValidation, loginUser);
router.delete("/delete/:id", verifyToken, runValidation, deleteUser);

module.exports = router;
