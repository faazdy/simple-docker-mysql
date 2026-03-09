const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

// obtener libros del usuario
router.get("/", async (req, res) => {

  const [books] = await db.query(`
    SELECT b.*
    FROM books b
    JOIN user_books ub ON b.id = ub.book_id
    WHERE ub.user_id = ?
  `, [req.user.id]);

  res.json(books);

});

// obtener TODOS libros
router.get("/allbooks", async (req, res) => {
  const [books] = await db.query(`SELECT * FROM books`);
  res.json(books);

});


// crear libro y asignarlo al usuario
router.post("/", async (req, res) => {

  const { title, author, year, genre, imageUrl } = req.body;

  const [result] = await db.query(
    "INSERT INTO books (title, author, year, genre, image_url) VALUES (?,?,?,?,?)",
    [title, author, year, genre, imageUrl]
  );

  const bookId = result.insertId;

  await db.query(
    "INSERT INTO user_books (user_id, book_id) VALUES (?,?)",
    [req.user.id, bookId]
  );

  res.json({ message: "Libro creado" });

});

// agregar libros a la biblioteca de usuario
router.post("/add/:bookId", async (req,res)=>{

  await db.query(
    "INSERT INTO user_books (user_id,book_id) VALUES (?,?)",
    [req.user.id, req.params.bookId]
  )

  res.json({message:"Libro agregado"})
})


// actualizar libro
router.put("/:id", async (req, res) => {

  const { title, author, year } = req.body;

  await db.query(`
    UPDATE books b
    JOIN user_books ub ON b.id = ub.book_id
    SET b.title=?, b.author=?, b.year=?
    WHERE b.id=? AND ub.user_id=?
  `, [title, author, year, req.params.id, req.user.id]);

  res.json({ message: "Libro actualizado" });

});

// eliminar libro del usuario
router.delete("/:id", async (req, res) => {

  await db.query(
    "DELETE FROM user_books WHERE user_id=? AND book_id=?",
    [req.user.id, req.params.id]
  );

  res.json({ message: "Libro eliminado de tu biblioteca" });

});

module.exports = router;