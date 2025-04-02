import React, { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';


export default function MainUtente() {
    const { carrello, datiUtente, salvaDatiUtente } = useGlobalContext();
    const [formData, setFormData] = useState({ nome: "", email: "", indirizzo: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        salvaDatiUtente(formData);
    };

    return (
        <div className="container mt-5 mb-5 p-4 rounded text-white"style={{ backgroundColor: '#ffffff20' }}>
            <h2 className="text-center mb-4">Inserisci i tuoi dati</h2>
            <form onSubmit={handleSubmit} className="mb-4 p-4 shadow-sm rounded">
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Inserisci il tuo nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
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
                        required
                        className="form-control"
                    />
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
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn w-100">Conferma Dati</button>
            </form>

            {datiUtente && (
                <div className="carrello-riepilogo p-4 shadow-sm rounded">
                    <h4 className="mb-3">Riepilogo Ordine</h4>
                    {carrello.length === 0 ? (
                        <p className="text-muted">Il carrello è vuoto.</p>
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
                </div>
            )}
        </div>
    );
}
