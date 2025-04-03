import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function MainUtente() {
  const { carrello, datiUtente, salvaDatiUtente } = useGlobalContext();

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    indirizzo: "",
  });

  const [errors, setErrors] = useState({});

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
      console.log("Dati salvati nel contesto:", formData); // Debug: verifica i dati salvati
      salvaDatiUtente(formData);
    }
  };

  const confermaOrdine = () => {
    console.log("Inizio confermaOrdine - datiUtente:", datiUtente); // Debug: stato iniziale di datiUtente
    console.log("Inizio confermaOrdine - carrello:", carrello); // Debug: stato iniziale di carrello

    if (
      !datiUtente ||
      !datiUtente.nome ||
      !datiUtente.cognome ||
      !datiUtente.email ||
      !datiUtente.indirizzo ||
      !carrello ||
      carrello.length === 0
    ) {
      console.log("Validazione fallita - datiUtente o carrello incompleti"); // Debug: motivo della validazione fallita
      alert(
        "Completa i dati utente e aggiungi almeno un prodotto al carrello."
      );
      return;
    }

    const orderData = {
      first_name: datiUtente.nome,
      last_name: datiUtente.cognome,
      email: datiUtente.email,
      billing_address: datiUtente.indirizzo,
      shipping_address: datiUtente.indirizzo,
      products: carrello.map((p) => ({
        slug: p.slug,
        quantity: p.quantita || 1,
      })),
    };

    console.log("Dati inviati al backend:", orderData); // Debug: dati inviati al backend

    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((orderResponse) => {
        console.log("Risposta dal backend (status):", orderResponse.status); // Debug: stato della risposta
        if (!orderResponse.ok) {
          return orderResponse.text().then((errorText) => {
            console.log("Errore dal backend:", errorText); // Debug: testo dell'errore
            throw new Error(`Errore nella creazione dell'ordine: ${errorText}`);
          });
        }
        return orderResponse.json();
      })
      .then((orderResult) => {
        console.log("Risultato dell'ordine:", orderResult); // Debug: risultato dell'ordine
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
Totale: €${total}
Indirizzo di spedizione: ${datiUtente.indirizzo}

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
Totale: €${total}
Indirizzo di spedizione: ${datiUtente.indirizzo}

Azione richiesta: elaborare l'ordine.
      `.trim();

        console.log("Invio email all'acquirente:", customerEmailText); // Debug: email acquirente
        return fetch("http://localhost:3000/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: datiUtente.email,
            subject: `Conferma Ordine #${orderId}`,
            text: customerEmailText,
          }),
        })
          .then((customerEmailResponse) => {
            console.log(
              "Risposta email acquirente (status):",
              customerEmailResponse.status
            ); // Debug: stato email acquirente
            if (!customerEmailResponse.ok) {
              throw new Error("Errore nell'invio dell'email all'acquirente");
            }

            console.log("Invio email al venditore:", vendorEmailText); // Debug: email venditore
            return fetch("http://localhost:3000/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: "vendor@aftergaming.com",
                subject: `Nuovo Ordine #${orderId}`,
                text: vendorEmailText,
              }),
            });
          })
          .then((vendorEmailResponse) => {
            console.log(
              "Risposta email venditore (status):",
              vendorEmailResponse.status
            ); // Debug: stato email venditore
            if (!vendorEmailResponse.ok) {
              throw new Error("Errore nell'invio dell'email al venditore");
            }

            alert(
              "Ordine completato! Email inviate con successo sia all'acquirente che al venditore."
            );
          });
      })
      .catch((error) => {
        console.error("Errore catturato:", error); // Debug: errore finale
        alert(`Si è verificato un errore: ${error.message}`);
      });
  };

  return (
    <div className="container mt-5 mb-5 p-4 text-white d-flex flex-column gap-4">
      <div className="rounded p-2" style={{ backgroundColor: "#ffffff20" }}>
        <h2 className="text-start">Inserisci i tuoi dati</h2>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mb-4 p-2 shadow-sm rounded"
        >
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
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
            <label htmlFor="cognome" className="form-label">
              Cognome
            </label>
            <input
              type="text"
              id="cognome"
              name="cognome"
              placeholder="Inserisci il tuo cognome"
              value={formData.cognome}
              onChange={handleChange}
              className="form-control"
            />
            {errors.cognome && (
              <div className="text-danger">{errors.cognome}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="indirizzo" className="form-label">
              Indirizzo
            </label>
            <input
              type="text"
              id="indirizzo"
              name="indirizzo"
              placeholder="Inserisci il tuo indirizzo"
              value={formData.indirizzo}
              onChange={handleChange}
              className="form-control"
            />
            {errors.indirizzo && (
              <div className="text-danger">{errors.indirizzo}</div>
            )}
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
        <div
          className="carrello-riepilogo p-4 shadow-sm rounded"
          style={{ backgroundColor: "#ffffff20" }}
        >
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
            Totale: €
            {carrello
              .reduce(
                (sum, p) => sum + Number(p.price || 0) * (p.quantita || 1),
                0
              )
              .toFixed(2)}
          </p>
          <div className="text-end">
            <button
              onClick={confermaOrdine}
              className="btn text-white hover-gioco"
              style={{ backgroundColor: "#f06c00" }}
            >
              Procedi al pagamento
            </button>
          </div>
          <div className="mt-4 border-top pt-4 text-start">
            <h4 className="mb-3">Dati Utente</h4>
            <p>
              <strong>Nome:</strong> {datiUtente.nome}
            </p>
            <p>
              <strong>Cognome:</strong> {datiUtente.cognome}
            </p>
            <p>
              <strong>Email:</strong> {datiUtente.email}
            </p>
            <p>
              <strong>Indirizzo:</strong> {datiUtente.indirizzo}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
