const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

//register
router.post("/register", async (req, res) => {

  const { full_name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const queryDuplicateUser = `SELECT * FROM users WHERE email = ?`
  const [rowVerifyDuplicate] = await db.query(queryDuplicateUser, [email])
  
  if(rowVerifyDuplicate.length > 0){
      res.json({ error: 'Este correo ya está registrado. Intenta con otro.' })
  } else{
    await db.query(
      "INSERT INTO users (full_name, email,password) VALUES (?,?,?)",
      [full_name, email, hash]
    );
    res.json({ message: "Usuario creado" });
  }

});

// CAMBIAR secret

//login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );

  if (rows.length === 0)
    return res.status(401).json({ error: "Usuario no existe" });

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ error: "Password incorrecto" });

  const token = jwt.sign(
    { 
      id: user.id,
      full_name: user.full_name
    },
    process.env.TOKEN,
    { expiresIn: "1h" }
  );

  res.json({ token });

});

module.exports = router;