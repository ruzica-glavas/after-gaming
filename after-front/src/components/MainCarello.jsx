import React from 'react';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from '../contexts/GlobalContext';
import { NavLink, Link } from 'react-router-dom';

export default function MainCarrello() {
    const { carrello, loading, error, rimuoviDalCarrello, cambiaQuantita, aggiungiAlCarrello, products } = useGlobalContext();

    const totalOriginal = carrello.reduce((sum, prodotto) => sum + (prodotto.original_price * prodotto.quantita), 0);
    const totalDiscounted = carrello.reduce((sum, prodotto) => sum + (prodotto.price * prodotto.quantita), 0);
    const totalSavings = totalOriginal - totalDiscounted;

    const piattaformeNelCarrello = [...new Set(carrello.map(prodotto => prodotto.platform))];

    const giochiConsigliati = products.filter(gioco => piattaformeNelCarrello.includes(gioco.platform) && !carrello.some(p => p.id === gioco.id));

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="carrello-container container mb-3">
            <div className="row g-3">
                <div className="col-12 col-lg-8">
                    <h2 className="carrello-titolo">Il tuo carrello</h2>
                    {carrello.length === 0 ? (
                        <div className="text-white text-center p-4 rounded  bg-dark">
                            <h4 className="mb-3">Il tuo carrello è vuoto 🛒...</h4>
                            <p className="mb-4">Scopri i giochi più popolari del momento e riempi il tuo carrello di avventure!</p>
                            <Link to="/tendenze">
                                <button className="btn hover-gioco order-button text-white px-4 py-2">Scopri le Tendenze</button>
                            </Link>
                        </div>
                    ) : (
                        carrello.map(prodotto => (
                            <div key={prodotto.id} className="carrello-item text-white d-flex align-items-md-center mb-3">
                                <Link to={`/dettaglio/${prodotto.slug}`} className="mb-2 mb-md-0">
                                    <img
                                        src={prodotto.image_url}
                                        alt={prodotto.name}
                                        className="carrello-img me-md-3"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x200?text=Immagine+non+disponibile';
                                        }}
                                    />
                                </Link>
                                <div className="carrello-info flex-grow-1">
                                    <span className="carrello-nome d-block">{prodotto.name}</span>
                                    <span className="carrello-piattaforma d-block">{prodotto.platform}</span>
                                </div>
                                <div className="d-flex gap-2 flex-md-row align-items-start align-items-md-center mt-2 mt-md-0 ms-md-3">
                                    <button
                                        className="carrello-rimuovi btn btn-outline-danger rounded mb-2 mb-md-0"
                                        onClick={() => rimuoviDalCarrello(prodotto.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Rimuovi
                                    </button>

                                    <div className="carrello-quantita me-md-3 mb-2 mb-md-0">
                                        <select
                                            value={prodotto.quantita}
                                            onChange={(e) => cambiaQuantita(prodotto.id, parseInt(e.target.value))}
                                            className="quantita-dropdown"
                                        >
                                            {[...Array(3).keys()].map(num => (
                                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <span className="carrello-prezzo">{(prodotto.price * prodotto.quantita).toFixed(2)}&euro;</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="col-12 col-lg-4">
                    <div className="carrello-riepilogo text-white p-4 rounded" style={{ background: '#333' }}>
                        <h4>Riepilogo Carrello</h4>
                        <p>Prezzo Originale: <strong style={{ color: "#ff4c4c" }}>{totalOriginal.toFixed(2)}&euro;</strong></p>
                        <p>Sconto: <strong style={{ color: "#ff6600" }}>-{totalSavings.toFixed(2)}&euro;</strong></p>
                        <hr />
                        <h3>Totale: <strong>{totalDiscounted.toFixed(2)}&euro;</strong></h3>

                        <NavLink to="/utente" className="mt-3 d-block">
                            <button className="order-button text-white btn w-100 p-3 hover-gioco">Procedi al pagamento {'➔'}</button>
                        </NavLink>
                        <hr />
                        <NavLink to="/" className="w-100 p-1">
                            <button className="back-button btn w-100 p-3">{'←'} Torna alla homepage </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            {giochiConsigliati.length > 0 && (
                <div className="giochi-consigliati mt-5">
                    <h5 className="text-white fs-3 pb-2">Giochi Consigliati</h5>
                    <div className="row g-3">
                        {giochiConsigliati.slice(0, 3).map(gioco => (
                            <div key={gioco.id} className="col-12 col-md-4">
                                <div className="gioco-card d-flex flex-column p-3 mb-3 text-white" style={{ background: '#444', borderRadius: '8px' }}>
                                    <Link to={`/dettaglio/${gioco.slug}`} className="mb-2">
                                        <img
                                            src={gioco.image_url}
                                            alt={gioco.name}
                                            className="image-suggested rounded"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/300x200?text=Immagine+non+disponibile';
                                            }}
                                        />
                                    </Link>
                                    <div className="info-suggested d-flex flex-md-row justify-content-between align-items-md-center">
                                        <div className=''>
                                            <p className='m-0 fw-bold game-name'>{gioco.name}</p>
                                            <p className='m-0'>{gioco.platform}</p>
                                            <p className="game-price">
                                                {gioco.original_price && (
                                                    <span className="original-price">{gioco.original_price}€</span>
                                                )}
                                                <span className="discounted-price">{gioco.price}€</span>
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-suggested fs-5 rounded hover-gioco text-white"
                                                onClick={() => aggiungiAlCarrello(gioco)}
                                            >
                                                Aggiungi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    );
};
