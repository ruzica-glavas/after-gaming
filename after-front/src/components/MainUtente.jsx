import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function MainUtente() {
  const { carrello, datiUtente, salvaDatiUtente, svuotaCarrello } = useGlobalContext();

  const [codiceSconto, setCodiceSconto] = useState("");
  const [scontoApplicato, setScontoApplicato] = useState(0);
  const [messaggioSconto, setMessaggioSconto] = useState("");
  const [discountCodes, setDiscountCodes] = useState([]); // Stato per i codici sconto
  const [isLoadingDiscountCodes, setIsLoadingDiscountCodes] = useState(true);

  const gestisciCodiceSconto = () => {
    // Esempio semplice: un solo codice sconto valido
    if (codiceSconto.toLowerCase() === "after10") {
      setScontoApplicato(10); // 10% di sconto
      setMessaggioSconto("✅ Codice sconto applicato: -10%");
    } else {
      setScontoApplicato(0);
      setMessaggioSconto("❌ Codice sconto non valido.");
    }
  };

  const totaleOriginale = carrello.reduce(
    (sum, p) => sum + Number(p.price || 0) * (p.quantita || 1),
    0
  );

  const totaleScontato = (totaleOriginale * (1 - scontoApplicato / 100)).toFixed(2);

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    indirizzo: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // 🔄 stato per il loader

  const validate = () => {
    let newErrors = {};

    if (formData.nome.trim() === "") {
      newErrors.nome = "Il nome è obbligatorio.";
    }
    if (formData.cognome.trim() === "") {
      newErrors.cognome = "Il cognome è obbligatorio.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida.";
    }
    if (formData.indirizzo.trim() === "") {
      newErrors.indirizzo = "L'indirizzo è obbligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dati salvati nel contesto:", formData);
      salvaDatiUtente(formData);
    }
  };

  const confermaOrdine = () => {
    setIsLoading(true); // 🔄 Avvia il loader
    console.log("Inizio confermaOrdine - datiUtente:", datiUtente);
    console.log("Inizio confermaOrdine - carrello:", carrello);

    if (
      !datiUtente ||
      !datiUtente.nome ||
      !datiUtente.cognome ||
      !datiUtente.email ||
      !datiUtente.indirizzo ||
      !carrello ||
      carrello.length === 0
    ) {
      console.log("Validazione fallita - datiUtente o carrello incompleti");
      alert("Completa i dati utente e aggiungi almeno un prodotto al carrello.");
      setIsLoading(false); // ❌ Stop se errore
      return;
    }

    const orderData = {
      first_name: datiUtente.nome,
      last_name: datiUtente.cognome,
      email: datiUtente.email,
      total: Number(totaleScontato),
      billing_address: datiUtente.indirizzo,
      shipping_address: datiUtente.indirizzo,
      products: carrello.map((p) => ({
        slug: p.slug,
        quantity: p.quantita || 1,
      })),
    };

    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((orderResponse) => {
        if (!orderResponse.ok) {
          return orderResponse.text().then((errorText) => {
            throw new Error(`Errore nella creazione dell'ordine: ${errorText}`);
          });
        }
        return orderResponse.json();
      })
      .then((orderResult) => {
        const orderId = orderResult.orderId;

        const orderDetails = carrello
          .map(
            (p) =>
              `${p.quantita || 1}x ${p.name} - €${Number(p.price || 0).toFixed(
                2
              )}`
          )
          .join("\n");

        const total = carrello
          .reduce((sum, p) => sum + Number(p.price || 0) * (p.quantita || 1), 0)
          .toFixed(2);

        const customerEmailText = `
Ordine #${orderId} Confermato!

Grazie ${datiUtente.nome} ${datiUtente.cognome} per il tuo acquisto!
Dettagli dell'ordine:
${orderDetails}
Totale: €${totaleScontato}
Indirizzo di fatturazione: ${datiUtente.indirizzo}

Riceverai aggiornamenti sullo stato della spedizione.
Contattaci a support@aftergaming.com per assistenza.

Cordiali saluti,
Il team di After Gaming
        `.trim();

        const vendorEmailText = `
Nuovo Ordine #${orderId}

Ordine da ${datiUtente.nome} ${datiUtente.cognome} (${datiUtente.email})
Dettagli:
${orderDetails}
Totale: €${totaleScontato}
Indirizzo di spedizione: ${datiUtente.indirizzo}

Azione richiesta: elaborare l'ordine.
        `.trim();

        return fetch("http://localhost:3000/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: datiUtente.email,
            subject: `Conferma Ordine #${orderId}`,
            text: customerEmailText,
          }),
        }).then(() =>
          fetch("http://localhost:3000/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: "vendor@aftergaming.com",
              subject: `Nuovo Ordine #${orderId}`,
              text: vendorEmailText,
            }),
          })
        );
      })
      .then(() => {
        svuotaCarrello()
        alert("Ordine completato! Email inviate con successo sia all'acquirente che al venditore.");
      })
      .catch((error) => {
        console.error("Errore catturato:", error);
        alert(`Si è verificato un errore: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false); // ✅ Fine: disattiva loader
      });
  };

  return (
    <div className="container mt-5 mb-5 p-4 text-white d-flex flex-column gap-4">
      {/* Overlay per il loader */}
      {isLoading && (
        <div
          className="overlay d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      )}

      <div className="rounded p-2" style={{ backgroundColor: "#ffffff20" }}>
        <h2 className="text-start">Inserisci i tuoi dati</h2>
        <form onSubmit={handleSubmit} noValidate className="mb-4 p-2 shadow-sm rounded">
          {/* Campi del form */}
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Inserisci il tuo nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-control"
            />
            {errors.nome && <div className="text-danger">{errors.nome}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="cognome" className="form-label">Cognome</label>
            <input
              type="text"
              id="cognome"
              name="cognome"
              placeholder="Inserisci il tuo cognome"
              value={formData.cognome}
              onChange={handleChange}
              className="form-control"
            />
            {errors.cognome && <div className="text-danger">{errors.cognome}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Inserisci la tua email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="indirizzo" className="form-label">Indirizzo</label>
            <input
              type="text"
              id="indirizzo"
              name="indirizzo"
              placeholder="Inserisci il tuo indirizzo"
              value={formData.indirizzo}
              onChange={handleChange}
              className="form-control"
            />
            {errors.indirizzo && <div className="text-danger">{errors.indirizzo}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="codiceSconto" className="form-label">Hai un codice sconto?</label>
            <div className="d-flex gap-2">
              <input
                type="text"
                id="codiceSconto"
                name="codiceSconto"
                placeholder="Inserisci codice"
                value={codiceSconto}
                onChange={(e) => setCodiceSconto(e.target.value)}
                className="form-control"
              />
              <button
                type="button"
                onClick={gestisciCodiceSconto}
                className="btn btn-outline-light hover-gioco"
                style={{ backgroundColor: "#f06c00", color: "#fff" }}
              >
                Applica
              </button>
            </div>
            {messaggioSconto && <div className="mt-2">{messaggioSconto}</div>}
          </div>

          <div className="text-end">
            <button
              type="submit"
              className="btn text-white hover-gioco"
              style={{ backgroundColor: "#f06c00" }}
            >
              Conferma Dati
            </button>
          </div>
        </form>
      </div>

      {datiUtente && (
        <div className="carrello-riepilogo p-4 shadow-sm rounded" style={{ backgroundColor: "#ffffff20" }}>
          <h4 className="mb-3">Riepilogo Ordine</h4>
          {carrello.length === 0 ? (
            <p className="text-white">Il carrello è vuoto.</p>
          ) : (
            <ul className="list-group mb-3">
              {carrello.map((prodotto) => (
                <li
                  key={prodotto.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {prodotto.name} - {prodotto.quantita || 1} x
                  </span>
                  <span>€{Number(prodotto.price || 0).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-end fw-bold">
            Totale: €{totaleScontato}
          </p>
          <div className="mt-1 pt-2 d-flex justify-content-between align-items-start flex-wrap border-top row">
            <div className="text-start w-100">
              <h4 className="mb-3">Dati Utente</h4>
              <p><strong>Nome:</strong> {datiUtente.nome}</p>
              <p><strong>Cognome:</strong> {datiUtente.cognome}</p>
              <p><strong>Email:</strong> {datiUtente.email}</p>
              <p><strong>Indirizzo:</strong> {datiUtente.indirizzo}</p>
            </div>
            <div className="text-end w-100 d-flex justify-content-end">
              <button
                onClick={confermaOrdine}
                className="btn text-white hover-gioco ms-auto"
                style={{ backgroundColor: "#f06c00", minWidth: "220px", height: "100%" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Elaborazione in corso...
                  </span>
                ) : (
                  "Procedi al pagamento"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
