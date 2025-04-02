import express from "express";
import {
  getProducts,
  getLatestProducts,
  getProductBySlug,
  createProduct,
  searchProducts,
} from "../controllers/afterController.js";

const router = express.Router();

// Definizione delle API
router.get("/products", getProducts);
router.get("/latest-products", getLatestProducts);
router.get("/products/:slug", getProductBySlug);
router.post("/products", createProduct);
router.get("/search", searchProducts); //GET http://localhost:3000/api/search?query=cyber   esempio

export default router;
