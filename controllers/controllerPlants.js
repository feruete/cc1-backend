const knex = require("../config/knexFile");

//MOSTRAR TODAS LAS PLANTAS
exports.getAllPlants = (req, res) => {
  knex("plants")
    .then((response) => {
      res.status(200).json({
        status: "success",
        results: response.length,
        data: {
          response,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//AGREGAR NUEVA PLANTA
exports.addPlant = (req, res) => {
  const {
    plantname,
    type,
    description,
    recommendations,
    img,
    location,
    climate,
  } = req.body;
  knex("plants")
    .insert({
      plantname,
      type,
      description,
      recommendations,
      img,
      location,
      climate,
    })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Su planta se agrego correctamente",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//ELIMINAR PLANTA
exports.deletePlant = (req, res) => {
  const { id } = req.params;
  knex("plants")
    .where({ plant_id: id })
    .del()
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Su planta se elimino correctamente",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//EDITAR PLANTA
exports.editPlant = (req, res) => {
  const {
    plantname,
    type,
    description,
    recommendations,
    img,
    location,
    climate,
  } = req.body;
  const { id } = req.params;
  knex("plants")
    .where({ plant_id: id })
    .update({
      plantname,
      type,
      description,
      recommendations,
      img,
      location,
      climate,
    })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Su planta se edito correctamente",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//BUSCAR UNA PLANTA PARTICULAR
exports.getPlantbyId = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  knex("plants")
    .where({ plant_id: id })
    .then((response) => {
      res.status(200).json({
        status: "success",
        results: response.length,
        data: {
          response,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
