import db from "../data/db.js";

export function getProducts(req, res) {
  let sql = "SELECT * FROM products";
  const params = [];
  const { sort, filter } = req.query;

  if (filter) {
    const filters = filter.split(",").map((f) => f.split("="));
    filters.forEach(([key, value]) => {
      sql += ` WHERE ${key} = ?`;
      params.push(value);
    });
  }
  if (sort) {
    const [field, order] = sort.split("-");
    sql += ` ORDER BY ${field} ${order === "desc" ? "DESC" : "ASC"}`;
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore lato server in getProducts" });
    }
    res.json(results);
  });
}

export function getLatestProducts(req, res) {
  const sql = "SELECT * FROM products ORDER BY created_at DESC LIMIT 5";

  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore lato server in getLatestProducts" });
    }
    res.json(results);
  });
}

export function getProductBySlug(req, res) {
  if (!req.db)
    return res
      .status(500)
      .json({ error: "Connessione al database non disponibile" });
  const { slug } = req.params; // Usiamo slug invece di id
  const productsSql = "SELECT * FROM products WHERE slug = ?";

  req.db.query(productsSql, [slug], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Errore lato server in getProductBySlug" });

    if (results.length === 0)
      return res.status(404).json({ error: "Prodotto non trovato" });
    res.json(results[0]);
  });
}
