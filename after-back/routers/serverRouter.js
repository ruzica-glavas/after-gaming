import {
  getProducts,
  getProductBySlug,
  getDigitalKeys,
  applyDiscount,
  getPromotions,
  checkout,
} from "../controllers/afterController.js";
import { validateDiscount, validateCheckout } from "../middleware.js";

router.get("/products", (req, res) => {
  req.db = req.app.get("db");
  getProducts(req, res);
});

router.get("/products/:slug", (req, res) => {
  req.db = req.app.get("db");
  getProductBySlug(req, res);
});

router.get("/digital-keys", (req, res) => {
  req.db = req.app.get("db");
  getDigitalKeys(req, res);
});

router.post("/apply-discount", validateDiscount, (req, res) => {
  req.db = req.app.get("db");
  applyDiscount(req, res);
});

router.post("/checkout", validateCheckout, (req, res) => {
  req.db = req.app.get("db");
  checkout(req, res);
});

router.get("/promotions", (req, res) => {
  req.db = req.app.get("db");
  getPromotions(req, res);
});

export default router;
