import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AggiungiAlCarrelloButton({ game }) {
    const { aggiungiAlCarrello } = useGlobalContext();

    const handleAddToCart = () => {
        aggiungiAlCarrello(game);
    };

    return (
        <button className="btn d-flex gap-2" style={{ backgroundColor: "var(--orange-color)", color: "white" }} onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "24px" }} />
            <p className="mb-0">Add to cart</p>
        </button>
    );
}

