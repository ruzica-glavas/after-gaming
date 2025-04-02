import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import serverRouter from "./routers/serverRouter.js";
import { logger, errorHandler } from "./middlewares/middleware.js";
import db from "./data/db.js"; // Importa la connessione al database
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

// Middleware
app.use(helmet()); // Sicurezza
app.use(compression()); // Compressione risposte
app.use(cors()); // CORS
app.use(express.json()); // Parsing JSON
app.use(logger); // Logger personalizzato

// Salva la connessione al database nel server
app.set("db", db);

// Configura il transporter Nodemailer per Mailtrap
app.use((req, res, next) => {
  req.transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
  next();
});

// Rotte API
app.use("/api", serverRouter);

// Middleware per la gestione degli errori (ultimo middleware)
app.use(errorHandler);

// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato sulla porta ${port}`);
});

export default app;