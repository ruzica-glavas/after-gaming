import React from 'react';
import { faCartPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from '../contexts/GlobalContext';
import { Link } from 'react-router-dom';

export default function MainWishlist() {
    const { wishlist, loading, error, rimuoviDallaWishlist, aggiungiAlCarrello } = useGlobalContext();

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
            <div className="wishlist-container container d-flex flex-column mb-3">
                <h2 className="wishlist-titolo text-white mb-4">La tua lista desideri</h2>

                {wishlist.length === 0 ? (
                    <p className="wishlist-vuoto text-white">La tua wishlist è vuota.</p>
                ) : (
                    <div className="wishlist-items">
                        {wishlist.map(prodotto => (
                            <div key={prodotto.id} className="wishlist-item card bg-dark text-white mb-3 p-3">
                                <div className="row g-3 align-items-stretch">
                                    {/* Immagine a sinistra */}
                                    <div className="col-md-3 position-relative text-center">
                                        <Link to={`/dettaglio/${prodotto.slug}`} className="game-image-wrapper-tendenze">
                                            <img
                                                src={prodotto.image_url}
                                                alt={prodotto.name}
                                                className="wishlist-img img-fluid rounded"
                                            />
                                        </Link>
                                        <FontAwesomeIcon
                                                icon={faTimes}
                                                className="wishlist-remove-icon"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => rimuoviDallaWishlist(prodotto.id)}
                                            />
                                    </div>


                                    {/* Info e bottone a destra */}
                                    <div className="col-md-9 d-flex flex-column justify-content-between align-items-end text-end">
                                        <div>
                                            <span className="wishlist-nome d-block mb-2 text-end">{prodotto.name}</span>
                                            <div className="wishlist-prezzi">
                                                <span className="wishlist-prezzo-originale d-block">
                                                    &euro;{prodotto.original_price}
                                                </span>
                                                {prodotto.price && (
                                                    <span className="wishlist-prezzo-scontato d-block">
                                                        &euro;{prodotto.price}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            className="wishlist-aggiungi-carrello btn btn-outline-success rounded mt-2"
                                            onClick={() => {
                                                aggiungiAlCarrello(prodotto);
                                                rimuoviDallaWishlist(prodotto.id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCartPlus} /> Carrello
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
    );
}
