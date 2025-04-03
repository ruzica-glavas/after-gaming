import React from 'react';
import { faTrash, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from '../contexts/GlobalContext';
import { NavLink } from 'react-router-dom';

export default function MainCarrello() {
    const { carrello, loading, error, rimuoviDalCarrello, cambiaQuantita, aggiungiAlCarrello, products } = useGlobalContext();

    // Calcolo dei totali
    const totalOriginal = carrello.reduce((sum, prodotto) => sum + (prodotto.original_price * prodotto.quantita), 0);
    const totalDiscounted = carrello.reduce((sum, prodotto) => sum + (prodotto.price * prodotto.quantita), 0);
    const totalSavings = totalOriginal - totalDiscounted;

    // Trova le piattaforme presenti nel carrello
    const piattaformeNelCarrello = [...new Set(carrello.map(prodotto => prodotto.platform))];

    // Filtra giochi consigliati basati sulla piattaforma
    const giochiConsigliati = products.filter(gioco => piattaformeNelCarrello.includes(gioco.platform) && !carrello.some(p => p.id === gioco.id));

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="carrello-container container d-flex flex-column mb-3">
            <div className="d-flex justify-content-between flex-wrap gap-2">
                {/* Sezione Carrello */}
                <div className="carrello-items" style={{ flex: 1, minWidth: '60%' }}>
                    <h2 className="carrello-titolo">Il tuo carrello</h2>
                    {carrello.length === 0 ? (
                        <p className="carrello-vuoto">Il tuo carrello è vuoto.</p>
                    ) : (
                        carrello.map(prodotto => (
                            <div key={prodotto.id} className="carrello-item text-white d-flex align-items-center mb-3">
                                <img src={prodotto.image_url} alt={prodotto.name} className="carrello-img me-3" />
                                <div className="carrello-info flex-grow-1">
                                    <span className="carrello-nome d-block">{prodotto.name}</span>
                                    <span className="carrello-piattaforma d-block">{prodotto.platform}</span>
                                    <button
                                        className="carrello-rimuovi btn btn-outline-danger rounded mt-2"
                                        onClick={() => rimuoviDalCarrello(prodotto.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Rimuovi
                                    </button>
                                </div>
                                <div className="carrello-quantita me-3">
                                    <select
                                        value={prodotto.quantita}
                                        onChange={(e) => cambiaQuantita(prodotto.id, parseInt(e.target.value))}
                                        className="quantita-dropdown"
                                    >
                                        {[...Array(10).keys()].map(num => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <span className="carrello-prezzo">{(prodotto.price * prodotto.quantita).toFixed(2)}€</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Sezione Riepilogo Carrello */}
                <div className="carrello-riepilogo text-white p-4 rounded" style={{ flex: '0 0 35%', background: '#333' }}>
                    <h4>Riepilogo Carrello</h4>
                    <p>Prezzo Originale: <del style={{ color: "#ff4c4c" }}>&euro;{totalOriginal.toFixed(2)}</del></p>
                    <p>Risparmio Totale: <strong style={{ color: "#ff6600" }}>&euro;{totalSavings.toFixed(2)}</strong></p>
                    <hr />
                    <h3>Totale Parziale: <strong>&euro;{totalDiscounted.toFixed(2)}</strong></h3>

                    <NavLink to="/utente" className=" w-100 mt-3 p-3 ">
                        <button className="order-button text-white btn w-75 mt-3 p-3 hover-gioco">Procedi al pagamento {'➔'}</button>
                    </NavLink>

                </div>
            </div>

            {/* Sezione Consigliati */}
            {giochiConsigliati.length > 0 && (
                <div className="giochi-consigliati mt-5">
                    <h5 className="text-white">Giochi Consigliati</h5>
                    <div className="">
                        {giochiConsigliati.slice(0, 3).map(gioco => (
                            <div key={gioco.id} className="gioco-card d-flex gap-3 text-white p-3 m-2" style={{ background: '#444', borderRadius: '8px' }}>
                                <img src={gioco.image_url} alt={gioco.name} className="image-suggested rounded mb-2" />
                                <div>
                                    <span className="d-block fw-bold">{gioco.name}</span>
                                    <span>{gioco.platform}</span>
                                    <p className="fw-bold mt-2">&euro;{gioco.price}</p>
                                    <button 
                                        className="btn btn-outline-secondary text-white mt-2"
                                        onClick={() => aggiungiAlCarrello(gioco)}
                                    >
                                        Aggiungi al Carrello <FontAwesomeIcon icon={faArrowUp} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};




