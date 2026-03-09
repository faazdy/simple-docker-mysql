const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

//register
router.post("/register", async (req, res) => {

  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (email,password) VALUES (?,?)",
    [email, hash]
  );

  res.json({ message: "Usuario creado" });

});


//login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );

  if (rows.length === 0)
    return res.status(401).json({ message: "Usuario no existe" });

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ message: "Password incorrecto" });

  const token = jwt.sign(
    { 
      id: user.id,
      fullName: user.fullName
    },
    "secret",
    { expiresIn: "1h" }
  );

  res.json({ token });

});

module.exports = router;