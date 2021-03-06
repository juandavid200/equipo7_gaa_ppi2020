const { Router } = require("express");
const router = Router();

const mysqlConnection = require("../db/db.js");

router.get("/", (req, res) => {
  res.send("Si funciona");
});

// usuario
//Petición get
router.get("/usuario", (req, res) => {
  mysqlConnection.query("SELECT * FROM usuario", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Petición post
router.post("/usuario", (req, res) => {
  const {
    ID,
    ID_tipoUsuario,
    correo,
    nombre_usuario,
    pais_origen,
    telefono,
    contrasena,
    sexo,
    fecha_nacimiento,
    nombre,
    apellidos
  } = req.body;
  let usuario = [
    ID,
    ID_tipoUsuario,
    correo,
    nombre_usuario,
    pais_origen,
    telefono,
    contrasena,
    sexo,
    fecha_nacimiento,
    nombre,
    apellidos
  ];
  let nuevoUsuario = `INSERT INTO usuario VALUES (?,?,?,?,?,?,?,?,?,?,?);`;

  mysqlConnection.query(nuevoUsuario, usuario, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Usuario ingresado` });
  });
});

//Petición put
router.put("/usuario/:ID", (req, res) => {
  const {
    ID_tipoUsuario,
    correo,
    nombre_usuario,
    pais_origen,
    telefono,
    contrasena,
    sexo,
    fecha_nacimiento,
    nombre,
    apellidos
  } = req.body;
  const { ID } = req.params;

  mysqlConnection.query(
    `UPDATE usuario
                       SET ID_tipoUsusario=?,correo=?,nombre_usuario=?, pais_origen=?, telefono=?, contrasena=?, sexo=?, fecha_nacimiento=?, nombre=?, apellidos = ? 
                       WHERE ID = ?`,
    [
      ID_tipoUsuario,
      correo,
      nombre_usuario,
      pais_origen,
      telefono,
      contrasena,
      sexo,
      fecha_nacimiento,
      nombre,
      apellidos,
      ID
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: `Usuario actualizado con éxito` });
      } else {
        console.log(err);
      }
    }
  );
});

//PETICIÓN O SERVICIO DELETE - ELIMINACIÓN DE DATOS
router.delete("/usuario/:ID", (req, res) => {
  const { ID } = req.params;
  mysqlConnection.query(
    `DELETE FROM usuario WHERE ID =?`,
    [ID],
    (err, rows, fields) => {
      if ("!err") {
        res.json({ status: `El usuario ha sido eliminado` });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
