const express = require("express");
const router = express.Router();
const afterController = require("../controllers/afterController");

import { index, show } from "../controllers/afterController";

router.get("/products", (req, res) => {
  req.db = req.app.get("db");
  afterController.getProducts(req, res);
});

router.get("/products/:slug", (req, res) => {
  req.db = req.app.get("db");
  afterController.getProductBySlug(req, res);
});

router.get("/digital-keys", (req, res) => {
  req.db = req.app.get("db");
  afterController.getDigitalKeys(req, res);
});

router.post("/apply-discount", (req, res) => {
  req.db = req.app.get("db");
  afterController.applyDiscount(req, res);
});

router.post("/checkout", (req, res) => {
  req.db = req.app.get("db");
  afterController.checkout(req, res);
});

router.get("/promotions", (req, res) => {
  req.db = req.app.get("db");
  afterController.getPromotions(req, res);
});

module.exports = router;
