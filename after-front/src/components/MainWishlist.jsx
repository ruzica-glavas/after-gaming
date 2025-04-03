import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext'; 

export default function MainWishlist() {
    const { wishlist, loading, error, rimuoviDallaWishlist, aggiungiAlCarrello } = useGlobalContext();

    console.log("Stato wishlist in MainWishlist:", wishlist);

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="wishlist-container container">
            <h2 className="wishlist-titolo text-white">La tua Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="wishlist-vuoto  text-white">La tua wishlist è vuota.</p>
            ) : (
                <>
                    {wishlist.map(prodotto => (
                        <div key={prodotto.id} className="wishlist-item text-white">
                            <img src={prodotto.image_url} alt={prodotto.name} className="wishlist-img" />
                            <div className="wishlist-info">
                                <span className="wishlist-nome">{prodotto.name}</span>
                                <span className="wishlist-piattaforma">Steam</span>
                                <button
                                    className="wishlist-rimuovi"
                                    onClick={() => rimuoviDallaWishlist(prodotto.id)}
                                >
                                     Rimuovi dalla Wishlist
                                </button>
                                <button
                                    className="wishlist-aggiungi-carrello"
                                    onClick={() => aggiungiAlCarrello(prodotto)}
                                >
                                     Aggiungi al Carrello
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}