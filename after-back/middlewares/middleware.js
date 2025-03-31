import helmet from "helmet";
import compression from "compression";
import { body, validationResult } from "express-validator";
import cors from "cors";

// Middleware di log
export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// Middleware per la gestione degli errori
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Errore interno del server" });
};

// Middleware predefiniti
export const security = helmet();
export const compress = compression();
export const corsMiddleware = cors();
