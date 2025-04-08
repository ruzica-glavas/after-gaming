import grazieImage from "../public/imgs/grazie.png";

export default function MainGrazie() {
    return (
        <div className="container py-5">
            <style>
                {`
                    @keyframes changeBackgroundColor {
                        0% {
                            background-color: #ff7f50;
                        }
                        25% {
                            background-color: #6a5acd;
                        }
                        50% {
                            background-color: #32cd32;
                        }
                        75% {
                            background-color: #1e90ff;
                        }
                        100% {
                            background-color: #ff7f50;
                        }
                    }

                    @keyframes rotateImage {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }

                    @keyframes fadeInText {
                        0% {
                            opacity: 0;
                            transform: translateX(-20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes hoverShadow {
                        0% {
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                        }
                        100% {
                            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
                        }
                    }

                    .background-change {
                        animation: changeBackgroundColor 5s infinite ease-in-out;
                    }

                    .rotate-infinite {
                        animation: rotateImage 5s linear infinite;
                    }

                    .fade-in {
                        animation: fadeInText 1s ease-out;
                    }

                    .hover-shadow:hover {
                        animation: hoverShadow 0.3s forwards;
                    }

                    /* Miglioramenti delle scritte */
                    .text-container h3 {
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #ffffff;
                        text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
                        letter-spacing: 2px;
                        margin-bottom: 20px;
                    }

                    .text-container p {
                        font-size: 1.2rem;
                        color: #ffffff;
                        text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
                        margin-bottom: 15px;
                    }

                    .list-group-item {
                        background: transparent;
                        border: none;
                        color: #fff;
                        font-size: 1.2rem;
                        padding: 10px 0;
                        text-align: center;
                        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
                    }

                    .list-group-item:hover {
                        color: #f0e68c;
                    }

                    /* Aggiungere un'ombra alle immagini */
                    .rotate-infinite {
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                    }

                    /* Layout orizzontale con Flexbox */
                    .d-flex {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: row; /* Manteniamo l'orientamento orizzontale */
                    }

                    .d-flex img {
                        margin: 0 30px;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    .d-flex img:hover {
                        transform: scale(1.1);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
                    }

                    /* Responsive per dispositivi mobili */
                    @media (max-width: 768px) {
                        .d-flex {
                            flex-direction: column;
                        }
                        .d-flex img {
                            margin-bottom: 20px;
                        }
                    }
                `}
            </style>
            <div className="row justify-content-center background-change">
                <div className="col-12 text-center text-white">
                    <div className="d-flex">
                        <img
                            src={grazieImage}
                            alt="grazie"
                            className="img-fluid rotate-infinite hover-shadow"
                            style={{ maxWidth: "300px" }}
                        />
                        <div className="text-container mx-4 fade-in">
                            <h3 className="mb-4">Grazie per avere visto il nostro sito!</h3>
                            <div className="list-group">
                                <p className="list-group-item">
                                    Grazie da ALEX
                                </p>
                                <p className="list-group-item">
                                    Grazie da GIOVANNI
                                </p>
                                <p className="list-group-item">
                                    Grazie da VINCENZO
                                </p>
                                <p className="list-group-item">
                                    Grazie da LUCA
                                </p>
                                <p className="list-group-item">
                                    Grazie da RUZICA
                                </p>
                                <p className="list-group-item">
                                    ECCO UN CODICE SCONTO DEL 10% PER AVER TROVATO LA NOSTRA PAGINA SEGRETA: <br />
                                    <strong>GAMER10</strong>
                                </p>
                            </div>
                        </div>
                        <img
                            src={grazieImage}
                            alt="grazie"
                            className="img-fluid rotate-infinite hover-shadow"
                            style={{ maxWidth: "300px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
