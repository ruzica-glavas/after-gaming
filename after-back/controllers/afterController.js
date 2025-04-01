import slugify from "slugify"
import db from "../data/db.js";

export function createProduct(req, res) {
  const { name, price, category } = req.body;
  
  if (!name || !price || !category) {
    return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
  }

  const baseSlug = slugify(name, { lower: true, strict: true });

  // Verifica se lo slug esiste già e genera uno univoco
  const checkSlugSql = "SELECT COUNT(*) AS count FROM products WHERE slug LIKE ?";
  db.query(checkSlugSql, [`${baseSlug}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel database" });
    }

    const count = results[0].count;
    const finalSlug = count > 0 ? `${baseSlug}-${count}` : baseSlug;

    const insertSql =
      "INSERT INTO products (name, price, category, slug) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [name, price, category, finalSlug], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Errore nell'inserimento del prodotto" });
      }
      res.status(201).json({ message: "Prodotto creato", slug: finalSlug });
    });
  });
}


export function getProducts(req, res) {
  let sql = "SELECT * FROM products";
  const params = [];
  const { sort, filter } = req.query;

  if (filter) {
    const filters = filter.split(",").map((f) => f.split("="));
    const filterConditions = filters.map(([key, value]) => {
      params.push(value);
      return `${key} = ?`;
    });

    sql += ` WHERE ${filterConditions.join(" AND ")}`;
  }

  if (sort) {
    const [field, order] = sort.split("-");
    sql += ` ORDER BY ${field} ${order === "desc" ? "DESC" : "ASC"}`;
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore lato server in getProducts" });
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
  const { slug } = req.params;
  const sql = "SELECT * FROM products WHERE slug = ?";

  db.query(sql, [slug], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore lato server in getProductBySlug" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }

    res.json(results[0]);
  });
}
