import React, { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function MainUtente() {
    const { carrello, datiUtente, salvaDatiUtente } = useGlobalContext();
    const [formData, setFormData] = useState({ nome: "", email: "", indirizzo: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (formData.nome.trim() === "") {
            newErrors.nome = "Il nome è obbligatorio.";
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
        setErrors({ ...errors, [e.target.name]: "" }); // Rimuove l'errore se l'utente corregge
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            salvaDatiUtente(formData);
        }
    };

    return (
        <div className="container mt-5 mb-5 p-4 text-white d-flex flex-column gap-4">
            <div className='rounded p-2' style={{ backgroundColor: '#ffffff20' }}>
                <h2 className="text-start">Inserisci i tuoi dati</h2>
                <form onSubmit={handleSubmit} noValidate className="mb-4 p-2 shadow-sm rounded">
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

                    <div className='text-end'>
                        <button type="submit" className="btn text-white" style={{ backgroundColor: "#f06c00" }}>
                            Conferma Dati
                        </button>
                    </div>
                </form>
            </div>

            {datiUtente && (
                <div className="carrello-riepilogo p-4 shadow-sm rounded" style={{ backgroundColor: '#ffffff20' }}>
                    <h4 className="mb-3">Riepilogo Ordine</h4>
                    {carrello.length === 0 ? (
                        <p className="text-white">Il carrello è vuoto.</p>
                    ) : (
                        <ul className="list-group mb-3">
                            {carrello.map(prodotto => (
                                <li key={prodotto.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{prodotto.name} - {prodotto.quantita} x</span>
                                    <span>€{Number(prodotto.price).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className="text-end fw-bold">
                        Totale: €{
                            carrello.reduce((sum, p) => sum + (Number(p.price) * p.quantita || 0), 0).toFixed(2)
                        }
                    </p>
                    <div className='text-end'>
                        <button className="btn text-white" style={{ backgroundColor: "#f06c00" }}>
                            Procedi al pagamento
                        </button>
                    </div>
                    <div className="mt-4 border-top pt-4 text-start">
                        <h4 className="mb-3">Dati Utente</h4>
                        <p><strong>Nome:</strong> {datiUtente.nome}</p>
                        <p><strong>Email:</strong> {datiUtente.email}</p>
                        <p><strong>Indirizzo:</strong> {datiUtente.indirizzo}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
