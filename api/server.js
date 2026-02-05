const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;

  db.run(sql, [name, email], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/users', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
