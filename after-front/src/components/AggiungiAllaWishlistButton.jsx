import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AggiungiAllaWishlistButton({ game }) {
    const { aggiungiAllaWishlist } = useGlobalContext();

    const handleAddToWishlist = () => {
        aggiungiAllaWishlist(game);
    };

    return (
        <button className="btn d-flex gap-2" style={{ backgroundColor: "var(--orange-color)", color: "white" }} onClick={handleAddToWishlist}>
            <FontAwesomeIcon icon={faHeart} style={{ fontSize: "24px" }} /> {/* Usa l'icona del cuore */}
            <p className="mb-0">Add to wishlist</p>
        </button>
    );
}