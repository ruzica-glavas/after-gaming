import express from "express";
const app = express();
import cors from "cors";
const port = process.env.SERVER_PORT || 3000;
import {
  security,
  compress,
  corsMiddleware,
  logger,
  validateDiscount,
  validateCheckout,
  errorHandler,
} from "./middlewares/middleware.js";

//import router
//import serverRouter from "./routers/serverRouter.js";

//middleware cors
app.use(cors());

//middleware express
app.use(express.json());

// Middleware
app.use(security); // Sicurezza con Helmet
app.use(compress); // Compressione delle risposte
app.use(corsMiddleware); // CORS
app.use(express.json()); // Parsing JSON
app.use(logger); // Logger personalizzato

app.listen(port, () => {
  console.log(`Server avviato sulla porta: ${port}`);
});

export default app;
