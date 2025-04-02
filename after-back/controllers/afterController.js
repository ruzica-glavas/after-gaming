import slugify from "slugify";
import db from "../data/db.js";

export function createProduct(req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var category = req.body.category;
  var description = req.body.description;
  var original_price = req.body.original_price;
  var image_url = req.body.image_url;
  var platform = req.body.platform;
  var trailer_url = req.body.trailer_url;

  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ error: "Tutti i campi obbligatori sono richiesti" });
  }

  var baseSlug = slugify(name, { lower: true, strict: true });

  // Verifica se lo slug esiste già e genera uno univoco
  var checkSlugSql = "SELECT COUNT(*) AS count FROM products WHERE slug LIKE ?";
  db.query(checkSlugSql, [baseSlug + "%"], function (err, results) {
    if (err) {
      return res.status(500).json({ error: "Errore nel database" });
    }

    var count = results[0].count;
    var finalSlug = count > 0 ? baseSlug + "-" + count : baseSlug;

    var insertSql =
      "INSERT INTO products (name, price, category, description, original_price, image_url, platform, trailer_url, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      insertSql,
      [
        name,
        price,
        category,
        description,
        original_price,
        image_url,
        platform,
        trailer_url,
        finalSlug,
      ],
      function (err, result) {
        if (err) {
          return res
            .status(500)
            .json({ error: "Errore nell'inserimento del prodotto" });
        }
        res.status(201).json({ message: "Prodotto creato", slug: finalSlug });
      }
    );
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
  const { slug } = req.params;
  const sql = "SELECT * FROM products WHERE slug = ?";

  db.query(sql, [slug], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Errore lato server in getProductBySlug" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }

    res.json(results[0]);
  });
}

// controller per la ricerca
export function searchProducts(req, res) {
  var query = req.query.query;
  if (!query) {
    return res
      .status(400)
      .json({ error: "Il parametro 'query' è obbligatorio" });
  }

  var searchQuery = "%" + query + "%";
  db.query(
    "SELECT id, slug, name, description, price, original_price, image_url, platform, trailer_url FROM products WHERE name LIKE ? OR description LIKE ?",
    [searchQuery, searchQuery],
    function (err, results) {
      if (err) {
        console.error("Errore nella ricerca dei prodotti:", err);
        return res.status(500).json({ error: "Errore interno del server" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Nessun prodotto trovato" });
      }
      res.status(200).json(results);
    }
  );
}
