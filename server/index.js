import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: "34.194.107.52",
  user: "crud_user",
  password: "StrongPassword123!",
  database: "crud",
  dateStrings: "date"
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok", time: new Date() });
});

// Get all books
app.get('/', (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });
});

// Create new book
app.post('/create', (req, res) => {
  const sql = "INSERT INTO book (publisher, name, date) VALUES (?, ?, ?)";
  const values = [req.body.publisher, req.body.name, req.body.date];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error creating book:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json({ message: "Book created", id: data.insertId });
  });
});

// Update book
app.put('/update/:id', (req, res) => {
  const sql = "UPDATE book SET publisher = ?, name = ?, date = ? WHERE id = ?";
  const values = [req.body.publisher, req.body.name, req.body.date, req.params.id];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json({ message: "Book updated" });
  });
});

// Delete book
app.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM book WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json({ message: "Book deleted" });
  });
});

// Get a single record
app.get('/getrecord/:id', (req, res) => {
  const sql = "SELECT * FROM book WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) {
      console.error("Error fetching record:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });
});

// Start server
app.listen(3030, () => {
  console.log("Backend running on port 3030");
});
