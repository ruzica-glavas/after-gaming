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
  const { query, platform, sort } = req.query;
  const params = [];
  let sql = `
    SELECT id, slug, name, description, price, original_price, image_url, platform, trailer_url 
    FROM products 
    WHERE 1=1
  `;

  // Aggiungi filtro di ricerca per nome o descrizione solo se query è presente
  if (query) {
    sql += ` AND (name LIKE ? OR description LIKE ?)`;
    params.push(`%${query}%`, `%${query}%`);
  }

  // Aggiungi filtro per piattaforma solo se platform è presente
  if (platform) {
    sql += ` AND platform = ?`;
    params.push(platform);
  }

  // Aggiungi ordinamento
  if (sort) {
    const [field, order] = sort.split('_');
    sql += ` ORDER BY ${field} ${order.toUpperCase()}`;
  } else {
    sql += ` ORDER BY name ASC`;
  }

  db.query(sql, params, function (err, results) {
    if (err) {
      console.error("Errore nella ricerca dei prodotti:", err);
      return res.status(500).json({ error: "Errore interno del server" });
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

  // Recupera i prodotti con i prezzi reali dal DB usando gli slug
  db.query(
    "SELECT id, slug, price FROM products WHERE slug IN (?)",
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

      // Mappa per i prezzi effettivi e product_id
      const productMap = new Map(
        productRows.map((p) => [p.slug, { id: p.id, price: p.price }])
      );

      let total = 0;
      const orderItems = [];
      const orderedProducts = []; // Per gestire le chiavi digitali

      for (const p of products) {
        const productInfo = productMap.get(p.slug);
        if (!productInfo) {
          return res
            .status(400)
            .json({ error: `Prodotto non valido: ${p.slug}` });
        }
        const price = productInfo.price;
        const itemTotal = price * p.quantity;
        total += itemTotal;
        orderItems.push([productInfo.id, p.quantity, price]);
        orderedProducts.push({
          slug: p.slug,
          productId: productInfo.id,
          quantity: p.quantity,
        });
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

          // Recupera chiavi digitali disponibili per ogni prodotto
          const productIds = orderedProducts.map((p) => p.productId);
          db.query(
            "SELECT id, product_id, `key`, is_sold FROM digital_keys WHERE product_id IN (?) AND is_sold = FALSE",
            [productIds],
            function (err, keyRows) {
              if (err) {
                console.error("Errore nel recupero delle chiavi:", err);
                return res.status(500).json({ error: "Errore nel recupero delle chiavi digitali" });
              }
        
              // Verifica disponibilità chiavi
              const keyMap = new Map();
              keyRows.forEach((key) => {
                if (!keyMap.has(key.product_id)) {
                  keyMap.set(key.product_id, []);
                }
                keyMap.get(key.product_id).push(key);
              });
        
              // Controlla se ci sono abbastanza chiavi per ogni prodotto
              for (const product of orderedProducts) {
                const availableKeys = keyMap.get(product.productId) || [];
                if (availableKeys.length < product.quantity) {
                  return res.status(400).json({
                    error: `Chiavi non disponibili per il prodotto ${product.slug}. Rimaste ${availableKeys.length} chiavi.`
                  });
                }
              }
        
              // Assegna le chiavi e marca come vendute
              const orderItemsValues = [];
              const keysToUpdate = [];
              const assignedKeys = [];
        
              for (const product of orderedProducts) {
                const availableKeys = keyMap.get(product.productId);
                for (let i = 0; i < product.quantity; i++) {
                  const key = availableKeys[i];
                  orderItemsValues.push([
                    orderId,
                    product.productId,
                    key.id,
                    1,
                    productMap.get(product.slug).price,
                  ]);
                  keysToUpdate.push(key.id);
                  assignedKeys.push({ slug: product.slug, key: key.key });
                }
              }
        
              // Aggiorna le chiavi come vendute in una singola query
              db.query(
                "UPDATE digital_keys SET is_sold = TRUE WHERE id IN (?)",
                [keysToUpdate],
                function (err) {
                  if (err) {
                    console.error("Errore nell'aggiornamento delle chiavi:", err);
                    return res.status(500).json({ error: "Errore nell'aggiornamento delle chiavi" });
                  }
                }
              );
              

              // Inseriamo i prodotti dell'ordine con le chiavi digitali
              db.query(
                "INSERT INTO order_product (order_id, product_id, digital_key_id, quantity, price_at_purchase) VALUES ?",
                [orderItemsValues],
                function (err) {
                  if (err) {
                    console.error("Errore negli item dell'ordine:", err);
                    return res
                      .status(500)
                      .json({ error: "Errore negli item dell'ordine" });
                  }

                  // Aggiorna le chiavi digitali come vendute
                  const keyIds = assignedKeys.map((k) =>
                    k.key.split("-").join("")
                  ); // Adatta il formato se necessario
                  db.query(
                    "UPDATE digital_keys SET is_sold = TRUE WHERE `key` IN (?)",
                    [keyIds],
                    function (err) {
                      if (err) {
                        console.error(
                          "Errore nell'aggiornamento delle chiavi:",
                          err
                        );
                        return res.status(500).json({
                          error: "Errore nell'aggiornamento delle chiavi",
                        });
                      }

                      // Costruisci il dettaglio dell'ordine per l'email
                      const orderDetails = orderItems
                        .map(([productId, quantity, price]) => {
                          const product = productRows.find((p) => p.id === productId);
                          const keysForProduct = assignedKeys
                            .filter((k) => k.slug === product.slug)
                            .map((k) => k.key);
                          
                          // Formatta ogni prodotto con il suo codice
                          return `
                      Prodotto: ${product.name}
                      Quantità: ${quantity}x
                      Prezzo: ${price}€
                      Codice di attivazione: ${keysForProduct.join(", ")}
                      -------------------`;
                        })
                        .join("\n");
const emailText = `
Ordine #${orderId} Confermato!

Gentile ${first_name} ${last_name},
grazie per il tuo acquisto su After Gaming!

DETTAGLI ORDINE:
${orderDetails}

Totale pagato: ${total}€
Indirizzo di fatturazione: ${shipping_address}

IMPORTANTE:
- I codici di attivazione sopra indicati sono unici e personali
- Attiva i tuoi giochi sulla piattaforma corrispondente
- Conserva questa email come prova d'acquisto

Per assistenza:
Email: support@aftergaming.com
Sito web: http://localhost:3000

Cordiali saluti,
Il team di After Gaming
                    `.trim();

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
                              console.error(
                                "Errore nell'invio email:",
                                emailErr
                              );
                            } else {
                              console.log("Email inviata:", info.response);
                            }
                          }
                        );
                      } else {
                        console.error("Servizio email non disponibile.");
                      }

                      res.status(201).json({
                        message: "Ordine creato con successo",
                        orderId,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}
// Controller per inviare il codice sconto
export function sendDiscountCode(req, res) {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email non valida" });
  }

  // Usa un codice sconto esistente dalla tabella discount_codes
  const discountCode = "WELCOME5"; // Codice predefinito dalla tua tabella discount_codes
  const discountValue = "5€"; // Valore fisso, puoi modificarlo o recuperarlo dal DB

  const emailText = `
Benvenuto su After Gaming!

Grazie per esserti iscritto. Ecco il tuo codice sconto di ${discountValue}:
${discountCode}

Usalo al checkout per risparmiare sul tuo prossimo acquisto!
Visita il nostro sito: http://localhost:3000

Cordiali saluti,
Il team di After Gaming
  `.trim();

  if (req.transporter) {
    req.transporter.sendMail(
      {
        from: "hi@demomailtrap.co",
        to: email,
        subject: "Il tuo codice sconto di benvenuto",
        text: emailText,
      },
      function (emailErr, info) {
        if (emailErr) {
          console.error("Errore nell'invio email:", emailErr);
          return res
            .status(500)
            .json({ error: "Errore nell'invio del codice sconto" });
        }
        console.log("Email inviata:", info.response);
        res.status(200).json({ message: "Codice sconto inviato con successo" });
      }
    );
  } else {
    console.error("Servizio email non disponibile.");
    return res.status(500).json({ error: "Servizio email non disponibile" });
  }
}
