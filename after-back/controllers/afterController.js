import slugify from "slugify";
import db from "../data/db.js";

export function createProduct(req, res) {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const original_price = req.body.original_price;
  const image_url = req.body.image_url;
  const platform = req.body.platform;
  const trailer_url = req.body.trailer_url;

  if (
    !name ||
    !price ||
    !category ||
    !description ||
    !original_price ||
    !image_url ||
    !platform ||
    !trailer_url
  ) {
    return res
      .status(400)
      .json({ error: "Tutti i campi obbligatori sono richiesti" });
  }

  const baseSlug = slugify(name, { lower: true, strict: true });

  // Verifica se lo slug esiste già e genera uno univoco
  const checkSlugSql =
    "SELECT COUNT(*) AS count FROM products WHERE slug LIKE ?";
  db.query(checkSlugSql, [baseSlug + "%"], function (err, results) {
    if (err) {
      return res.status(500).json({ error: "Errore nel database" });
    }

    const count = results[0].count;
    const finalSlug = count > 0 ? baseSlug + "-" + count : baseSlug;

    const insertSql =
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
  const query = req.query.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: "Il parametro 'query' è obbligatorio" });
  }

  const searchQuery = "%" + query + "%";
  const sort = req.query.sort || "name"; // Default: ordinamento per nome
  const sortOrder = sort.includes("desc") ? "DESC" : "ASC";
  const sortField = sort.replace("_desc", "").replace("_asc", "");

  const sql =
    "SELECT id, slug, name, description, price, original_price, image_url, platform, trailer_url FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY " +
    sortField +
    " " +
    sortOrder;
  db.query(sql, [searchQuery, searchQuery], function (err, results) {
    if (err) {
      console.error("Errore nella ricerca dei prodotti:", err);
      return res.status(500).json({ error: "Errore interno del server" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Nessun prodotto trovato" });
    }
    res.status(200).json(results);
  });
}

export function getPromotions(req, res) {
  db.query(
    "SELECT id, slug, name, description, price, original_price, image_url, platform, trailer_url FROM products WHERE original_price IS NOT NULL",
    function (err, results) {
      if (err) {
        console.error("Errore nella query:", err);
        return res.status(500).json({ error: "Errore interno del server" });
      }
      res.status(200).json(results);
    }
  );
}

export function validateDiscountCode(req, res) {
  const code = req.params.code;
  const today = new Date().toISOString().split("T")[0];

  db.query(
    "SELECT * FROM discount_codes WHERE code = ? AND is_active = TRUE AND start_date <= ? AND end_date >= ?",
    [code, today, today],
    function (err, results) {
      if (err) {
        console.error("Errore nella query:", err);
        return res.status(500).json({ error: "Errore interno del server" });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: "Codice sconto non valido o scaduto" });
      }
      res
        .status(200)
        .json({ discount_percentage: results[0].discount_percentage });
    }
  );
}

//     funzione email
export function sendEmail(req, res) {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res
      .status(400)
      .json({ error: "Tutti i campi (to, subject, text) sono obbligatori" });
  }

  if (!req.transporter) {
    return res
      .status(500)
      .json({ error: "Il servizio email non è disponibile" });
  }

  const mailOptions = {
    from: "hi@demomailtrap.co",
    to: to, // Usare l'indirizzo passato dal FE
    subject: subject,
    text: text,
  };

  req.transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Errore nell'invio email:", error);
      return res.status(500).json({ error: "Errore nell'invio email" });
    }
    console.log("Email inviata:", info.response);
    res.status(200).json({ message: "Email inviata con successo" });
  });
}

export function createOrder(req, res) {
  const {
    first_name,
    last_name,
    email,
    billing_address,
    shipping_address,
    products,
  } = req.body;

  if (!email || !products || products.length === 0) {
    return res.status(400).json({ error: "Email e prodotti sono obbligatori" });
  }

  const slugs = products.map((p) => p.slug);

  // Recupera i prodotti con i prezzi reali dal DB
  db.query(
    "SELECT slug, price FROM products WHERE slug IN (?)",
    [slugs],
    function (err, productRows) {
      if (err) {
        console.error("Errore nella query prodotti:", err);
        return res
          .status(500)
          .json({ error: "Errore nel recupero dei prodotti" });
      }

      if (productRows.length !== products.length) {
        return res
          .status(400)
          .json({ error: "Uno o più prodotti non esistono" });
      }

      // Mappa per i prezzi effettivi
      const productMap = new Map(productRows.map((p) => [p.slug, p.price]));

      let total = 0;
      const orderItems = [];

      for (const p of products) {
        const price = productMap.get(p.slug);
        if (!price) {
          return res
            .status(400)
            .json({ error: `Prodotto non valido: ${p.slug}` });
        }
        const itemTotal = price * p.quantity;
        total += itemTotal;
        orderItems.push([p.slug, p.quantity, price]);
      }

      // Inseriamo l'ordine
      db.query(
        "INSERT INTO orders (total, billing_address, shipping_address, first_name, last_name, email, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
        [
          total,
          billing_address,
          shipping_address,
          first_name,
          last_name,
          email,
        ],
        function (err, orderResult) {
          if (err) {
            console.error("Errore nella creazione dell'ordine:", err);
            return res.status(500).json({ error: "Errore nell'ordine" });
          }

          const orderId = orderResult.insertId;
          const orderItemsValues = orderItems.map((item) => [orderId, ...item]);

          // Inseriamo i prodotti dell'ordine
          db.query(
            "INSERT INTO order_product (order_id, slug, quantity, price_at_purchase) VALUES ?",
            [orderItemsValues],
            function (err) {
              if (err) {
                console.error("Errore negli item dell'ordine:", err);
                return res
                  .status(500)
                  .json({ error: "Errore negli item dell'ordine" });
              }

              // Costruisci il dettaglio dell'ordine per l'email
              const orderDetails = orderItems
                .map(
                  ([slug, quantity, price]) =>
                    `${quantity}x ${slug} - ${price}€`
                )
                .join("\n");

              const emailText = `
Ordine #${orderId} Confermato!

Grazie ${first_name} ${last_name} per il tuo acquisto!
Dettagli dell'ordine:
${orderDetails}
Totale: ${total}€
Indirizzo di spedizione: ${shipping_address}

Riceverai un'email con gli aggiornamenti sullo stato della spedizione.
Contattaci a support@aftergaming.com per assistenza.

Cordiali saluti,
Il team di After Gaming
            `.trim();

              // Invia l'email di conferma solo se il transporter è disponibile
              if (req.transporter) {
                req.transporter.sendMail(
                  {
                    from: "hi@demomailtrap.co",
                    to: email,
                    subject: `Conferma Ordine #${orderId}`,
                    text: emailText,
                  },
                  function (emailErr, info) {
                    if (emailErr) {
                      console.error("Errore nell'invio email:", emailErr);
                    } else {
                      console.log("Email inviata:", info.response);
                    }
                  }
                );
              } else {
                console.error("Servizio email non disponibile.");
              }

              res
                .status(201)
                .json({ message: "Ordine creato con successo", orderId });
            }
          );
        }
      );
    }
  );
}
