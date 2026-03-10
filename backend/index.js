require('dotenv').config();
const express = require("express");
const cors = require("cors");

const authMiddleware = require('./middleware/auth')
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/books.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});