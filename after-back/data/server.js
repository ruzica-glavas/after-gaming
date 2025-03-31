import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import serverRouter from "../routers/serverRouter.js";
import { PORT, default as app } from "./app.js";

dotenv.config();

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

// Middleware per la gestione degli errori
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server avviato sulla porta: ${port}`);
});

export default db;
