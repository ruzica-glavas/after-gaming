import express from "express";
import {
  getProducts,
  getLatestProducts,
  getProductBySlug,
} from "../controllers/afterController.js";

const router = express.Router();

// Definizione delle API
router.get("/products", getProducts);
router.get("/latest-products", getLatestProducts);
router.get("/products/:slug", getProductBySlug);

export default router;
