const knex = require("../config/knexFile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTRO DE USUARIO
exports.registerController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password, salt);

  knex("users")
    .where("email", email)
    .then((result) => {
      if (result.length) {
        res.status(400).json({ error: "El email ya esta siendo utilizado" });
        return;
      }
      knex("users")
        .insert({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: passwordEncrypt,
        })
        .then(() => {
          res.json({
            success: true,
            mensaje: "El usuario se ha registrado correctamente",
          });
        })
        .catch((error) => {
          res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//MOSTRAR TODOS LOS USUARIOS
exports.showAll = (req, res) => {
  knex("users")
    .then((respuesta) => {
      res.json(respuesta);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//ELIMINAR USUARIO
exports.deleteUser = (req, res) => {};

//LOGIN DE USUARIO
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  knex("users")
    .where("email", email)
    .then(async (result) => {
      if (!result.length) {
        res.status(404).json({
          error: "Email y/o contraseña incorrecta/s",
        });
        return;
      }
      const validatePassword = await bcrypt.compare(
        password,
        result[0].password
      );
      if (!validatePassword) {
        res.status(404).json({
          error: "Email y/o contraseña incorrecta/s",
        });
        return;
      }
      const token = jwt.sign(
        {
          firstname: result[0].firstname,
          lastname: result[0].lastname,
          email: result[0].email,
          user_id: result[0].user_id,
          access: result[0].access,
        },
        process.env.TOKEN_SECRET
      );

      res.json({ success: true, token: token });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};
