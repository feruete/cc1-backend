const { check } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.userValidator = [
  check("firstname")
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre no debe contener números"),
  check("lastname")
    .not()
    .isEmpty()
    .withMessage("El apellido es requerido")
    .isString()
    .withMessage("El apellido no debe contener números"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Se requiere el email")
    .isEmail()
    .withMessage("Formato de email inválido"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Se requiere contraseña")
    .isLength({ min: 8, max: 120 })
    .withMessage(
      "La password debe tener un mínimo 8 caracteres y un máximo de 120"
    ),
];

exports.loginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Se requiere el email")
    .isEmail()
    .withMessage("Formato de email inválido"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Se requiere contraseña")
    .isLength({ min: 8, max: 120 })
    .withMessage(
      "La password debe tener un mínimo 8 caracteres y un máximo de 120"
    ),
];

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res
      .status(401)
      .json({ error: "Debes estar loggeado para acceder a este recurso" });
    return;
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "El token es invalido", mensaje: error });
  }
};

exports.verifyAdmin = (req, res, next) => {
  const userAdmin = req.user;
  if (userAdmin.access != "1") {
    res.status(401).json({
      error: "No tienes los permisos necesarios para acceder a este recurso",
    });
    return;
  }
  next();
};
