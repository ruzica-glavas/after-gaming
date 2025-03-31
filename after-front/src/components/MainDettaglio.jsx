import { faCartShopping, faCloud, faFire, faGamepad, faHeart, faShareNodes, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import gamesData from "../../data-test/data-test.js";
import { useParams } from 'react-router-dom';

export default function MainDettaglio() {

    const { id } = useParams();
    const game = gamesData.find(game => game.id === Number(id));

    const [usersOnline, setUsersOnline] = useState(0);

    useEffect(() => {
        setUsersOnline(Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    }, []);



    return (
        <div className="container mt-5">
            <div className="row text-center">
                <div className="col-6">
                    <img src={game.image_url} alt={game.name} className="game-image-dettaglio"/>
                </div>
                <div className="col-6">
                    <h1>{game.name}</h1>
                    <p>Prezzo: {game.original_price} €</p>
                    <p>Data di rilascio: {new Date(game.created_at).toLocaleDateString()}</p>
                    <p>Disponibile per: {game.platform.join(", ")}</p>
                    <p> users on this page: {usersOnline}
                        <FontAwesomeIcon icon={faFire} color="red" style={{ marginLeft: "3px" }} />
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-5">
                        <button className="btn btn-primary d-flex gap-2">
                            <FontAwesomeIcon icon={faHeart} style={{ color: "grey", fontSize: "24px" }} />
                            <p className="mb-0">Add to wishlist</p>
                        </button>
                        <button className="btn btn-primary d-flex gap-2">
                            <FontAwesomeIcon icon={faCartShopping} style={{ color: "grey", fontSize: "24px" }} />
                            <p className="mb-0">Add to cart</p>
                        </button>
                    </div>
                </div>

                <div className="col-12 mt-5">
                    <h2>Descrizione</h2>
                    <p className="mt-3">{game.description}</p>
                    <h2>Dettagli</h2>
                    <p className="mt-3">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente nam officia temporibus. 
                        Nam culpa corporis architecto voluptates, saepe obcaecati itaque vitae tempore atque. Velit modi, 
                        voluptates culpa ipsa quisquam porro!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Sapiente nam officia temporibus. Nam culpa corporis architecto voluptates, saepe obcaecati itaque
                    </p>
                </div>

                <div className="col-12 mt-5">
                    <iframe width="1000" height="500" src={game.trailer_url} title={game.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <h2>Configurazioni</h2>

                    <div className="col-6 text-start mt-3">
                        <h3>Configurazione Minima</h3>
                        <ul className="list-unstyled text-start mt-3">
                            <li><strong>OS:</strong> Windows 10/11</li>
                            <li><strong>Processore:</strong> Intel Core i7 8700k / AMD Ryzen 5 3600</li>
                            <li><strong>Memoria:</strong> 16 GB RAM</li>
                            <li><strong>Grafica:</strong> Nvidia GeForce GTX 1070 8GB / AMD Radeon RX 5700 8GB / Intel Arc A580 8GB (REBAR ON)</li>
                            <li><strong>DirectX:</strong> Version 12</li>
                            <li><strong>Storage:</strong> 115 GB available space</li>
                        </ul>
                    </div>
                    
                    <div className="col-6 text-start mt-3">
                        <h3>Configurazione Raccomandata</h3>
                        <ul className="list-unstyled text-start mt-3">
                            <li><strong>OS:</strong> Windows 10/11</li>
                            <li><strong>Processore:</strong> Intel Core i5 11600k / AMD Ryzen 5 5600x</li>
                            <li><strong>Memoria:</strong> 16 GB RAM</li>
                            <li><strong>Grafica:</strong> Nvidia GeForce RTX 3060Ti 8GB / AMD Radeon RX 6700 XT 12GB / Intel Arc B580 12GB (REBAR ON)</li>
                            <li><strong>DirectX:</strong> Version 12</li>
                            <li><strong>Storage:</strong> 115 GB available space</li>
                        </ul>
                    </div>

                    <div class="container text-center mt-5">
                        <h2>Caratteristiche del gioco</h2>
                        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mt-3 h-50">
                            <div class="col">
                                <div class="p-3 border h-100 align-content-center rounded">
                                    <FontAwesomeIcon icon={faUser} /> 
                                    <h3>Single-player</h3>
                                </div>
                            </div>
                            <div class="col">
                                <div class="p-3 border h-100 align-content-center rounded">
                                    <FontAwesomeIcon icon={faUsers} />
                                    <h3>Multiplayer</h3>
                                </div>
                            </div>
                            <div class="col">
                                <div class="p-3 border h-100 align-content-center rounded">
                                    <FontAwesomeIcon icon={faGamepad} />
                                    <h3>Xbox controller support</h3>
                                </div>
                            </div>
                            <div class="col">
                                <div class="p-3 border h-100 align-content-center rounded">
                                    <FontAwesomeIcon icon={faCloud} />
                                    <h3>Steam cloud</h3>
                                </div>
                            </div>
                            <div class="col">
                                <div class="p-3 border h-100 align-content-center rounded">
                                    <FontAwesomeIcon icon={faShareNodes} />
                                    <h3>Family sharing</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    );
}