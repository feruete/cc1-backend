const express = require("express");
const {
  getAllPlants,
  addPlant,
  deletePlant,
  editPlant,
  getPlantbyId,
} = require("../controllers/controllerPlants");
const { runValidation } = require("../validators");

const { plantValidator } = require("../validators/validatorsPlants");

const router = express.Router();
router.get("/getall", getAllPlants);
router.get("/get/:id", getPlantbyId);
router.post("/add", plantValidator, runValidation, addPlant);
router.delete("/delete/:id", deletePlant);
router.patch("/edit/:id", plantValidator, runValidation, editPlant);

module.exports = router;
