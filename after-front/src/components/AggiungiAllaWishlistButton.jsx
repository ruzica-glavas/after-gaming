import React, { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AggiungiAllaWishlistButton({ game }) {
    const { aggiungiAllaWishlist } = useGlobalContext();
    const [mostraMessaggio, setMostraMessaggio] = useState(false);

    const handleAddToWishlist = () => {
        aggiungiAllaWishlist(game);
        setMostraMessaggio(true);
        setTimeout(() => setMostraMessaggio(false), 1500); // Messaggio scompare dopo 2.5 secondi
    };

    return (
        <div className="d-flex flex-column align-items-center position-relative">
            {mostraMessaggio && (
                <div
                    className="toast-notification"
                    style={{
                        position: "absolute",
                        top: "-35px",
                        backgroundColor: "var(--orange-color)",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontSize: "0.9rem",
                        zIndex: 1000,
                    }}
                >
                    Aggiunto alla lista desideri!
                </div>
            )}
            <button
                className="d-flex px-4 py-2 gap-1 order-button text-white btn hover-gioco"
                style={{ backgroundColor: "var(--orange-color)", color: "white" }}
                onClick={handleAddToWishlist}
            >
                <FontAwesomeIcon icon={faHeart} style={{ fontSize: "24px" }} />
                <p className="mb-0">Lista desideri</p>
            </button>
        </div>
    );
}
