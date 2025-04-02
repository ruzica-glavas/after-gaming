// /Users/Greggione/Desktop/Boolean/after-gaming/after-front/src/components/AggiungiAlCarrelloButton.jsx

import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function AggiungiAlCarrelloButton({ game }) {
    const { aggiungiAlCarrello } = useGlobalContext();

    const handleClick = () => {
        aggiungiAlCarrello(game);
    };

    return (
        <button onClick={handleClick} className="btn d-flex gap-2" style={{ backgroundColor: "var(--orange-color)", color: "white" }}>
            <FontAwesomeIcon icon={faCartShopping} style={{ color: "white", fontSize: "24px" }} />
            <p className="mb-0">Aggiungi al carrello</p>
        </button>
    );
}
