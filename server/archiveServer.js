const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database("spiral_archive.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS relics (
    id INTEGER PRIMARY KEY,
    seed TEXT,
    color TEXT,
    size REAL,
    x REAL,
    y REAL,
    z REAL
  )`);
});

app.use(express.json());

app.post("/relics", (req, res) => {
  const { seed, color, size, x, y, z } = req.body;
  db.run(
    "INSERT INTO relics (seed, color, size, x, y, z) VALUES (?, ?, ?, ?, ?, ?)",
    [seed, color, size, x, y, z]
  );
  res.sendStatus(201);
});

app.get("/relics", (req, res) => {
  db.all("SELECT * FROM relics", [], (err, rows) => {
    res.json(rows);
  });
});

app.get("/status", (req, res) => {
  db.get("SELECT COUNT(*) AS count FROM relics", (err, row) => {
    if (err) {
      return res.status(500).json({ mic: true, db: "error", relicCount: 0 });
    }
    res.json({ mic: true, db: "ok", relicCount: row.count });
  });
});

app.listen(port, () => console.log(`Archive server listening on port ${port}...`));