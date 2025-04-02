import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MainUtente({ giochi }) {
    // Stato per ogni campo del form
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    
    // Stato per i dati del riepilogo ordine
    const [formData, setFormData] = useState(null);
    
    // Stato per gli errori
    const [errors, setErrors] = useState({});

    // Funzione per la validazione email
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    // Funzione per la validazione del telefono
    const validateTelefono = (telefono) => {
        // Verifica se il numero di telefono ha tra 10 e 15 cifre
        return telefono.length >= 10 && telefono.length <= 15;
    };

    // Funzione per gestire il submit
    const handleSubmit = (e) => {
        e.preventDefault(); // Impedisce il ricaricamento della pagina al submit

        const newErrors = {};

        // Validazione email
        if (!validateEmail(email)) {
            newErrors.email = "L'email non è valida.";
        }

        // Validazione telefono
        if (!validateTelefono(telefono)) {
            newErrors.telefono = "Il numero di telefono deve avere tra 10 e 15 cifre.";
        }

        // Se ci sono errori, aggiorna lo stato degli errori
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Crea un oggetto con i dati del form
        const data = {
            nome,
            cognome,
            email,
            telefono,
            giochi
        };

        // Imposta i dati nel riepilogo
        setFormData(data);

        // Pulisci gli errori dopo l'invio
        setErrors({});
    };

    return (

        <div className="container text-white py-4 my-4 rounded" style={{ backgroundColor: "var(--dark-color)" }}>
            <h2 className="text-center my-4">Inserisci i tuoi dati</h2>

            {/* Dati personali */}
            <form className="row g-3" onSubmit={handleSubmit} noValidate>
                <div className="col-md-6">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Inserisci il nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Cognome</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Inserisci il cognome"
                        value={cognome}
                        onChange={(e) => setCognome(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Inserisci l'email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Telefono</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Inserisci il telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                    {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                </div>

                <div className="col-12 text-end">
                    
                    <NavLink to="/carello" className="btn me-1">
                        <button type="submit" className="btn text-white" style={{ backgroundColor: "var(--orange-color)" }}>Indietro</button>
                    </NavLink>

                    <button type="submit" className="btn text-white" style={{ backgroundColor: "var(--orange-color)" }}>
                        Invia
                    </button>
                    
                </div>
            </form>
            <hr />
            {/* Riepilogo ordine */}
            {formData && (
                <div className="mt-4">
                    <h3>Riepilogo ordine</h3>
                    <ul className="list-unstyled text-white mt-3">
                        <li><strong>Nome:</strong> {formData.nome}</li>
                        <li><strong>Cognome:</strong> {formData.cognome}</li>
                        <li><strong>Email:</strong> {formData.email}</li>
                        <li><strong>Telefono:</strong> {formData.telefono}</li>
                    </ul>
                    <div>
                        <h4>Giochi dell'ordine:</h4>
                        <ul>
                            {formData.giochi.length > 0 ? (
                                formData.giochi.map((gioco, index) => (
                                    <li key={index}>
                                        {gioco.name} - {gioco.price}€ x {gioco.quantita}
                                    </li>
                                ))
                            ) : (
                                <p>Nessun gioco selezionato.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
