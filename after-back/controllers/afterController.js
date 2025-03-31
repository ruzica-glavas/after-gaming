import db from "../data/db.js";

export function getProducts(req, res) {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore lato server in getProducts" });
    }
    res.json(results);
  });
}
