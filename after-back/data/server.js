const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const serverRouter = require("./routers/serverRouter");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connessione al database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "after_gaming_db",
});

db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connesso al database MySQL");
});

//  connessione al database
app.set("db", db);

// Usa le route definite in serverRouter
app.use("/api", serverRouter);

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
