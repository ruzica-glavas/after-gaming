import express from "express";
import {
  getProducts,
  getLatestProducts,
  getProductBySlug,
  createProduct
} from "../controllers/afterController.js";

const router = express.Router();

// Definizione delle API
router.get("/products", getProducts);
router.get("/latest-products", getLatestProducts);
router.get("/products/:slug", getProductBySlug);
router.post("/products", createProduct);

export default router;
