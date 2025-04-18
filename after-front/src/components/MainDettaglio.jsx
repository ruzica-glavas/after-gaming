import { faCartShopping, faCloud, faGamepad, faHeart, faPlay, faShareNodes, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import UltimiArrivi from "../pages/UltimiArrivi";
import AggiungiAlCarrelloButton from "./AggiungiAlCarrelloButton";
import { useGlobalContext } from '../contexts/GlobalContext';
import AggiungiAllaWishlistButton from "./AggiungiAllaWishlistButton";
import Tendenze from "../pages/Tendenze";

export default function MainDettaglio() {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { aggiungiAllaWishlist, carrello } = useGlobalContext();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:3000/api/products');
                const foundGame = data.find(game => game.slug === slug);
                setGame(foundGame || null);
                setError(foundGame ? null : "Ops! Sembra che il gioco che cerchi non ci sia...");
            } catch (err) {
                setError("Errore nel recupero dei giochi");
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [slug]);

    const isInCart = (game, cart) => {
        return cart.some(item => item.id === game.id);
    };

    const giàNelCarrello = game && isInCart(game, carrello);

    if (loading) return <div>Loading...</div>;
    if (error) return (
        <div className="text-center py-4 fw-bold fs-3 " style={{ color: '#ff8800' }}>{error}
            <div className="text-white py-2 w-100 not-found">
                <p className="text-white pb-3 fs-5">Ma potrebbero piacerti questi 😉</p>
                <span><Tendenze /></span>
            </div>
        </div>
    );

    const handleTrailerClick = () => {
        const trailer = document.getElementById("game-trailer");
        if (trailer) {
            trailer.scrollIntoView({ behavior: "smooth" });

            const iframe = trailer.querySelector("iframe");
            if (iframe) {
                iframe.src += (iframe.src.includes("?") ? "&" : "?") + "autoplay=1";

                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.mozRequestFullScreen) {
                    iframe.mozRequestFullScreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            }
        }
    };

    const buttonStyle = { backgroundColor: "var(--orange-color)", color: "white" };
    const iconStyle = { fontSize: "24px" };

    const featureList = [
        { icon: faUser, label: "Single-player" },
        { icon: faUsers, label: "Multiplayer" },
        { icon: faGamepad, label: "Xbox controller support" },
        { icon: faCloud, label: "Steam cloud" },
        { icon: faShareNodes, label: "Family sharing" },
    ];

    const shareUrl = window.location.href;

    return (
        <div className="container mt-5 pb-5 text-center">
            <div className="game-image-dettaglio-container row">
                <div className="col-12 col-md-6 p-0">
                    <img src={game.image_url} alt={game.name} className="game-image-dettaglio img-fluid" />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-white">{game.name}</h1>
                    <p className="text-white"><b>{game.price}</b> €</p>
                    <p className="text-white">Data di rilascio: <b>{new Date(game.created_at).toLocaleDateString()}</b></p>
                    <p className="text-white">Piattaforma: <b>{game.platform}</b></p>
                    {giàNelCarrello && <p className="nel-carrello mt-2">✅ Aggiunto al carrello!</p>}

                    <div className="d-flex justify-content-center gap-3 mt-2">
                        <AggiungiAllaWishlistButton game={game} />
                        <AggiungiAlCarrelloButton game={game} disabled={giàNelCarrello} />
                        <button className="d-flex gap-1 px-4 py-2 order-button text-white btn hover-gioco" style={buttonStyle} onClick={handleTrailerClick}>
                            <FontAwesomeIcon icon={faPlay} style={iconStyle} />
                            <p className="mb-0">Video</p>
                        </button>
                    </div>

                    <div className="mt-4 w-75 px-md-5">
                        <p className="text-white mb-1">Condividi:</p>
                        <div className="input-group">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="form-control form-control-sm text-body-secondary bg-dark-subtle"
                                aria-label="Link condivisibile"
                            />
                            <button
                                className="btn btn-sm hover-gioco"
                                style={buttonStyle}
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl)
                                        .then(() => alert("Link copiato negli appunti!"))
                                        .catch(err => {
                                            console.error("Errore copia link:", err);
                                            alert("Errore nel copiare il link");
                                        });
                                }}
                            >
                                Copia
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-5 text-start">
                    <h2 className="text-white">Descrizione</h2>
                    <p className="mt-3 text-secondary">{game.description}</p>

                    <h2 className="text-white">Dettagli</h2>
                    <p className="mt-3 text-secondary">
                        Scopri un'esperienza di gioco unica con {game.name}. Immergiti in un mondo ricco di avventure,
                        sfide e divertimento. Questo gioco combina grafica mozzafiato, gameplay coinvolgente e una storia
                        avvincente. Che tu sia un giocatore esperto o un principiante, {game.name} è perfetto per te.
                    </p>
                </div>

                <div id="game-trailer" className="col-12 mt-5">
                    <iframe width="100%" height="500" src={game.trailer_url} title={game.name} allow="autoplay" className="rounded"></iframe>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <h2 className="text-white text-start"><b>Configurazioni</b></h2>

                        {[
                            {
                                title: "Configurazione Minima",
                                specs: [
                                    { label: "OS", value: "Windows 10/11" },
                                    { label: "Processore", value: "Intel Core i7 8700k / AMD Ryzen 5 3600" },
                                    { label: "Memoria", value: "16 GB RAM" },
                                    { label: "Grafica", value: "Nvidia GTX 1070 8GB / AMD RX 5700 8GB" },
                                    { label: "DirectX", value: "Version 12" },
                                    { label: "Storage", value: "115 GB available space" },
                                ],
                            },
                            {
                                title: "Configurazione Raccomandata",
                                specs: [
                                    { label: "OS", value: "Windows 10/11" },
                                    { label: "Processore", value: "Intel Core i5 11600k / AMD Ryzen 5 5600x" },
                                    { label: "Memoria", value: "16 GB RAM" },
                                    { label: "Grafica", value: "Nvidia RTX 3060Ti 8GB / AMD RX 6700 XT 12GB" },
                                    { label: "DirectX", value: "Version 12" },
                                    { label: "Storage", value: "115 GB available space" },
                                ],
                            },
                        ].map(({ title, specs }, index) => (
                            <div key={index} className="col-12 col-md-6 text-start mt-4">
                                <h3 className="text-white">{title}</h3>
                                <ul className="list-unstyled mt-3 text-secondary">
                                    {specs.map(({ label, value }, i) => (
                                        <li key={i}><strong className="text-white">{label}:</strong> {value}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="container text-center mt-5 text-white">
                            <h2 className="text-white text-start">Caratteristiche del gioco</h2>
                            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-2 g-lg-3 mt-3">
                                {featureList.map(({ icon, label }, index) => (
                                    <div key={index} className="col">
                                        <div className="p-3 border h-100 rounded text-center hover-gioco d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={icon} />
                                            <h3>{label}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="container d-flex flex-column pt-5 pb-4">
                            <h4 className="text-white px-4 pb-3 text-start">
                                Ultime uscite <Link to="/ultimi-arrivi"><button className="btn rounded-circle fs-7" style={{ backgroundColor: "#f06c00" }}>{'\u2794'}</button></Link>
                            </h4>
                            <UltimiArrivi />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
