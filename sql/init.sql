CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    year INT,
    genre VARCHAR(50),
    image_url TEXT
);

CREATE TABLE user_books (
  user_id INT,
  book_id INT,
  PRIMARY KEY (user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

INSERT INTO books (title, author, year, genre, image_url) VALUES
('Dune', 'Frank Herbert', 1965, 'Science Fiction', 'https://covers.openlibrary.org/b/id/8108696-L.jpg'),
('1984', 'George Orwell', 1949, 'Dystopian', 'https://covers.openlibrary.org/b/id/7222246-L.jpg'),
('Brave New World', 'Aldous Huxley', 1932, 'Dystopian', 'https://covers.openlibrary.org/b/id/8773276-L.jpg'),
('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 'https://covers.openlibrary.org/b/id/6979861-L.jpg'),
('The Catcher in the Rye', 'J.D. Salinger', 1951, 'Classic', 'https://covers.openlibrary.org/b/id/8231856-L.jpg'),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 2011, 'History', 'https://covers.openlibrary.org/b/id/8231996-L.jpg'),
('The Alchemist', 'Paulo Coelho', 1988, 'Philosophical Fiction', 'https://covers.openlibrary.org/b/id/8128691-L.jpg'),
('The Name of the Wind', 'Patrick Rothfuss', 2007, 'Fantasy', 'https://covers.openlibrary.org/b/id/8235081-L.jpg'),
('Atomic Habits', 'James Clear', 2018, 'Self Help', 'https://covers.openlibrary.org/b/id/10212581-L.jpg'),
('Clean Code', 'Robert C. Martin', 2008, 'Programming', 'https://covers.openlibrary.org/b/id/9641656-L.jpg');