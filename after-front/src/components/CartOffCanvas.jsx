import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { useGlobalContext } from '../contexts/GlobalContext';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';

function CartOffCanvas({ show, handleClose }) {
    const { carrello, rimuoviDalCarrello, cambiaQuantita } = useGlobalContext();
    const [totalDiscounted, setTotalDiscounted] = useState(0);

    useEffect(() => {
        const newTotal = carrello.reduce((sum, prodotto) => sum + (prodotto.price * prodotto.quantita), 0);
        setTotalDiscounted(newTotal);
    }, [carrello]);

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className='offcanvas-custom bg-dark text-white'>
            <Offcanvas.Header closeButton closeVariant='white'>
                <Offcanvas.Title>Il tuo carrello</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {carrello.length === 0 ? (
                    <p>Il tuo carrello è vuoto.</p>
                ) : (
                    <>
                        {carrello.map(prodotto => (
                            <div key={prodotto.id} className="carrello-item text-white d-flex align-items-center mb-3">
                                <img src={prodotto.image_url} alt={prodotto.name} className="carrello-img me-3" style={{width: '150px', height: '100px', objectFit: 'cover'}}/>
                                <div className="carrello-info flex-grow-1">
                                    <span className="carrello-nome d-block">{prodotto.name}</span>
                                    <span className="carrello-piattaforma d-block">{prodotto.platform}</span>
                                    <span className="carrello-prezzo">{(prodotto.price * prodotto.quantita).toFixed(2)}€</span>
                                </div>
                                <div className="d-flex flex-column gap-4">
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
                                <button
                                        className="carrello-rimuovi btn btn-outline-danger rounded mt-2"
                                        onClick={() => rimuoviDalCarrello(prodotto.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <hr/>
                        <p className='fs-4 fw-bold'>Totale: {totalDiscounted.toFixed(2)}€</p>
                        <NavLink to="/utente" className=" w-100 mt-3 p-3 ">
                            <button className="order-button text-white btn w-75 mt-3 p-3" onClick={handleClose}>Procedi al pagamento {'➔'}</button>
                        </NavLink>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default CartOffCanvas;
