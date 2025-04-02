import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function MainCarrello() {
    const { carrello, loading, error, rimuoviDalCarrello, cambiaQuantita } = useGlobalContext();

    const totale = carrello.reduce((acc, prodotto) => acc + prodotto.price * prodotto.quantita, 0);

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="carrello-container container">
            <h2 className="carrello-titolo">Il tuo carrello</h2>
            {carrello.length === 0 ? (
                <p className="carrello-vuoto">Il tuo carrello è vuoto.</p>
            ) : (
                <>
                    {carrello.map(prodotto => (
                        <div key={prodotto.id} className="carrello-item text-white">
                            <img src={prodotto.image_url} alt={prodotto.name} className="carrello-img" />
                            <div className="carrello-info">
                                <span className="carrello-nome">{prodotto.name}</span>
                                <span className="carrello-piattaforma">Steam</span>
                                <button 
                                    className="carrello-rimuovi"
                                    onClick={() => rimuoviDalCarrello(prodotto.id)}
                                >
                                    🗑 Sposta alla lista desideri
                                </button>
                            </div>
                            <div className="carrello-quantita">
                                <select
                                    value={prodotto.quantita}
                                    onChange={(e) => cambiaQuantita(prodotto.id, e.target.value)}
                                    className="quantita-dropdown"
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <span className="carrello-prezzo ml-2">{(prodotto.price * prodotto.quantita).toFixed(2)}€</span>
                        </div>
                    ))}
                    <div className="carrello-totale">
                        <h3>Totale: {totale.toFixed(2)}€</h3>
                    </div>
                </>
            )}
        </div>
    );
};

