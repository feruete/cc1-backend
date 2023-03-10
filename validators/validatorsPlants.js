const { check } = require("express-validator");

exports.plantValidator = [
  check("plantname")
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre no debe contener números"),
  check("type")
    .isString()
    .withMessage("El tipo de planta no debe contener números"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("Se requiere una descripción de la planta")
    .isString()
    .withMessage("El tipo de planta no debe contener números"),
  check("recommendations")
    .isString()
    .withMessage("Las recomendaciones de la planta no deben contener números"),
  check("img")
    .not()
    .isEmpty()
    .withMessage("Una imagen de la planta es requerida")
    .isString()
    .withMessage("Ingrese un url valido"),
  check("location")
    .isString()
    .withMessage("El tipo de planta no debe contener números"),
  check("climate")
    .isString()
    .withMessage("El tipo de planta no debe contener números"),
];
