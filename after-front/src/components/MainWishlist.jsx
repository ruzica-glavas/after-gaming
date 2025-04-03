import React from 'react';
import { faCartPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from '../contexts/GlobalContext';

export default function MainWishlist() {
    const { wishlist, loading, error, rimuoviDallaWishlist, aggiungiAlCarrello } = useGlobalContext();

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="wishlist-container container d-flex flex-column mb-3">
            <h2 className="wishlist-titolo text-white">La tua Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="wishlist-vuoto text-white">La tua wishlist è vuota.</p>
            ) : (
                <div className="wishlist-items" style={{ flex: 1, minWidth: '60%' }}>
                    {wishlist.map(prodotto => (
                        <div key={prodotto.id} className="wishlist-item text-white d-flex flex-column align-items-center mb-3">
                        <div className="wishlist-image-container">
                            <img src={prodotto.image_url} alt={prodotto.name} className="wishlist-img" />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="wishlist-remove-icon"
                                onClick={() => rimuoviDallaWishlist(prodotto.id)}
                            />
                        </div>
                        <div className="text-center">
                            <span className="wishlist-nome d-block">{prodotto.name}</span>
                            <div className="wishlist-prezzi">
                                <span className="wishlist-prezzo-originale d-block">
                                    &euro;{prodotto.original_price}
                                </span>
                                {prodotto.discounted_price && (
                                    <span className="wishlist-prezzo-scontato d-block">
                                        &euro;{prodotto.discounted_price}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            className="wishlist-aggiungi-carrello btn btn-outline-success rounded mt-2"
                            onClick={() => aggiungiAlCarrello(prodotto)}
                        >
                            <FontAwesomeIcon icon={faCartPlus} /> Carrello
                        </button>
                    </div>
                    
                    
                    ))}
                </div>
            )}
        </div>
    );
}
