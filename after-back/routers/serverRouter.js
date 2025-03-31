import express from "express";
import { getProducts } from "../controllers/afterController.js";

const router = express.Router();

// Definizione delle API
router.get("/products", getProducts);

export default router;
