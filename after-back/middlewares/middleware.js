import helmet from "helmet";
import compression from "compression";
import { body, validationResult } from "express-validator";

// Middleware di log
export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// Middleware di validazione per apply-discount
export const validateDiscount = [
  body("code")
    .notEmpty()
    .withMessage("Il codice è obbligatorio")
    .isLength({ min: 1, max: 50 })
    .withMessage("Il codice deve essere tra 1 e 50 caratteri"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware di validazione per checkout
export const validateCheckout = [
  body("products").isArray().withMessage("I prodotti devono essere un array"),
  body("user.first_name").notEmpty().withMessage("Il nome è obbligatorio"),
  body("user.last_name").notEmpty().withMessage("Il cognome è obbligatorio"),
  body("user.email").isEmail().withMessage("Email non valida"),
  body("user.billing_address")
    .notEmpty()
    .withMessage("L'indirizzo di fatturazione è obbligatorio"),
  body("user.shipping_address")
    .notEmpty()
    .withMessage("L'indirizzo di spedizione è obbligatorio"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Esporta i middleware predefiniti
export const security = helmet();
export const compress = compression();
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Errore interno del server" });
};
