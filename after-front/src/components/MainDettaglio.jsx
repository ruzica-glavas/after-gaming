import gioco from "../../data-test/data-test";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function MainDettaglio() {
    const [usersOnline, setUsersOnline] = useState(0);

    useEffect(() => {
        setUsersOnline(Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    }, []);

    return (
        <div className="container mt-5">
            <div className="row text-center">
                <div className="col-6">
                    <img src={gioco.image_url} alt={gioco.name} />
                </div>
                <div className="col-6">
                    <h1>{gioco.name}</h1>
                    <p>Prezzo: {gioco.original_price} €</p>
                    <p>Data di rilascio: {new Date(gioco.created_at).toLocaleDateString()}</p>
                    <p>Disponibile per: {gioco.platform.join(", ")}</p>
                    <p> users on this page: {usersOnline}
                        <FontAwesomeIcon icon={faFire} color="red" style={{ marginLeft: "3px" }} />
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-5">
                        <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faHeart} style={{ color: "grey", fontSize: "24px" }} />Add to wishlist
                        </button>
                        <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faCartShopping} style={{ color: "grey", fontSize: "24px" }} />Add to cart
                        </button>
                    </div>
                </div>

                <div className="col-12 mt-5">
                    <h2>Descrizione</h2>
                    <p>{gioco.description}</p>
                    <h2>Dettagli</h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente nam officia temporibus. 
                        Nam culpa corporis architecto voluptates, saepe obcaecati itaque vitae tempore atque. Velit modi, 
                        voluptates culpa ipsa quisquam porro!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Sapiente nam officia temporibus. Nam culpa corporis architecto voluptates, saepe obcaecati itaque
                    </p>
                </div>

                <div className="col-12 mt-5">
                    <iframe width="1000" height="500" src={gioco.trailer_url} title={gioco.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </div>
        </div>
    );
}