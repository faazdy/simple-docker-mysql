const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {

    const decoded = jwt.verify(token, process.env.TOKEN);

    req.user = decoded;

    next();

  } catch {
    res.status(401).json({ message: "Token inválido" });
  }

};