import { faCartShopping, faCloud, faFire, faGamepad, faHeart, faShareNodes, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assicurati di importare Axios
import { Link } from "react-router-dom";
import UltimiArrivi from "./UltimiArrivi";

export default function MainDettaglio() {
    const { slug } = useParams(); // Ottieni il parametro "slug" dall'URL
    const [game, setGame] = useState(null);
    const [usersOnline, setUsersOnline] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Stato per gestire gli errori

    useEffect(() => {
        setLoading(true); // Inizia il caricamento

        // Fai una chiamata GET per ottenere tutti i giochi
        axios.get('http://localhost:3000/api/products') // Cambia l'endpoint con quello corretto
            .then(response => {
                const games = response.data; // Supponiamo che la risposta sia un array di giochi

                // Trova il gioco con lo slug
                const foundGame = games.find(game => game.slug === slug);

                if (foundGame) {
                    setGame(foundGame);
                } else {
                    console.error("Gioco non trovato con slug:", slug);
                    setGame(null);
                }

                setLoading(false); // Finito il caricamento
            })
            .catch(err => {
                console.error("Errore nel recupero dei giochi:", err);
                setError("Errore nel recupero dei giochi");
                setLoading(false); // Finito il caricamento anche in caso di errore
            });

        // Imposta un numero casuale di utenti online
        setUsersOnline(Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    }, [slug]);

    // Se il gioco è ancora in caricamento
    if (loading) {
        return <div>Loading...</div>;
    }

    // Se c'è un errore
    if (error) {
        return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;
    }

    // Se non troviamo il gioco
    if (!game) {
        return (
            <div className="container mt-5 text-center">
                <h2>Gioco non trovato</h2>
                <p>Il gioco con slug <strong>{slug}</strong> non è disponibile.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5 pb-5">
            <div className="text-center">
                <div className="game-image-dettaglio-container row">
                    <div className="col-6 p-0">
                        <img src={game.image_url} alt={game.name} className="game-image-dettaglio" />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="text-white">{game.name}</h1>
                        <p className="text-white"><b>{game.price}</b> €</p>
                        <p className="text-white">Data di rilascio: <b>{new Date(game.created_at).toLocaleDateString()}</b></p>

                        <p className="text-white"> Utenti a questa pagina: <fragment style={{ color: "var(--orange-color)" }}>{usersOnline}</fragment>
                            <FontAwesomeIcon icon={faFire} style={{ color: "var(--orange-color)", marginLeft: "3px" }} />
                        </p>
                        <div className="d-flex justify-content-center gap-3 mt-5">
                            <button className="btn d-flex gap-2" style={{ backgroundColor: "var(--orange-color)", color: "white" }}>
                                <FontAwesomeIcon icon={faHeart} style={{ color: "white", fontSize: "24px" }} />
                                <p className="mb-0">Add to wishlist</p>
                            </button>
                            <button className="btn d-flex gap-2" style={{ backgroundColor: "var(--orange-color)", color: "white" }}>
                                <FontAwesomeIcon icon={faCartShopping} style={{ color: "white", fontSize: "24px" }} />
                                <p className="mb-0">Add to cart</p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-5 text-start ">
                    <h2 className="text-white">Descrizione</h2>
                    <p className="mt-3 text-secondary">{game.description}</p>
                    <h2 className="text-white">Dettagli</h2>
                    <p className="mt-3 text-secondary">
                        Scopri un'esperienza di gioco unica con {game.name}. Immergiti in un mondo ricco di avventure,
                        sfide e divertimento. Progettato per offrire ore di intrattenimento, questo gioco combina
                        grafica mozzafiato, gameplay coinvolgente e una storia avvincente. Che tu sia un giocatore
                        esperto o un principiante, {game.name} è perfetto per te. Preparati a vivere un'avventura
                        indimenticabile!
                    </p>
                </div>

                <div className="col-12 mt-5">
                    <iframe width="1000" height="500" src={game.trailer_url} title={game.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <h2 className="text-white text-start"><b>Configurazioni</b></h2>

                        <div className="col-6 text-start mt-4">
                            <h3 className="text-white">Configurazione Minima</h3>
                            <ul className="list-unstyled text-start mt-3 text-secondary">
                                <li><strong className="text-white">OS:</strong> Windows 10/11</li>
                                <li><strong className="text-white">Processore:</strong> Intel Core i7 8700k / AMD Ryzen 5 3600</li>
                                <li><strong className="text-white">Memoria:</strong> 16 GB RAM</li>
                                <li><strong className="text-white">Grafica:</strong> Nvidia GeForce GTX 1070 8GB / AMD Radeon RX 5700 8GB / Intel Arc A580 8GB (REBAR ON)</li>
                                <li><strong className="text-white">DirectX:</strong> Version 12</li>
                                <li><strong className="text-white">Storage:</strong> 115 GB available space</li>
                            </ul>
                        </div>

                        <div className="col-6 text-start mt-3 text-secondary">
                            <h3 className="text-white">Configurazione Raccomandata</h3>
                            <ul className="list-unstyled text-start mt-3 text-secondary">
                                <li><strong className="text-white">OS:</strong> Windows 10/11</li>
                                <li><strong className="text-white">Processore:</strong> Intel Core i5 11600k / AMD Ryzen 5 5600x</li>
                                <li><strong className="text-white">Memoria:</strong> 16 GB RAM</li>
                                <li><strong className="text-white">Grafica:</strong> Nvidia GeForce RTX 3060Ti 8GB / AMD Radeon RX 6700 XT 12GB / Intel Arc B580 12GB (REBAR ON)</li>
                                <li><strong className="text-white">DirectX:</strong> Version 12</li>
                                <li><strong className="text-white">Storage:</strong> 115 GB available space</li>
                            </ul>
                        </div>

                        <div className="container text-center mt-5 text-white">
                            <h2 className="text-white">Caratteristiche del gioco</h2>
                            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mt-3 h-50">
                                <div className="col">
                                    <div className="p-3 border h-100 align-content-center rounded hover-effect">
                                        <FontAwesomeIcon icon={faUser} />
                                        <h3>Single-player</h3>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="p-3 border h-100 align-content-center rounded hover-effect">
                                        <FontAwesomeIcon icon={faUsers} />
                                        <h3>Multiplayer</h3>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="p-3 border h-100 align-content-center rounded hover-effect">
                                        <FontAwesomeIcon icon={faGamepad} />
                                        <h3>Xbox controller support</h3>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="p-3 border h-100 align-content-center rounded hover-effect">
                                        <FontAwesomeIcon icon={faCloud} />
                                        <h3>Steam cloud</h3>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="p-3 border h-100 align-content-center rounded hover-effect">
                                        <FontAwesomeIcon icon={faShareNodes} />
                                        <h3>Family sharing</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex flex-column pt-5 pb-4">
                            <h4 className="text-white px-4 pb-3">Ultime uscite <Link to={`/ultimi-arrivi`}><button className="btn rounded-circle fs-7" style={{ backgroundColor: "#f06c00" }}>{'\u2794'}</button></Link></h4>
                            <UltimiArrivi />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

