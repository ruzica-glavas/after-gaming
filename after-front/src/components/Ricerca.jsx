import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import GameData from "../../data-test/data-test.js";

export default function Ricerca() {
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    useEffect(() => {
        if (searchQuery) {
            setFilteredGames(
                GameData.filter((element) => {
                    const gameName = element.name || "";
                    return gameName.toLowerCase().includes(searchQuery.toLowerCase());
                })
            );
        } else {
            setFilteredGames(GameData);
        }
    }, [searchQuery]);

    return (
        <div className="container">
            {searchQuery && <h4 className="px-4 pb-3">Risultati per: "{searchQuery}"</h4>}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
                {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <div key={game.id}>
                            <Link to={`/dettaglio/${game.id}`}>
                                <img src={game.image_url} alt={game.name || game.title} className="game-image" />
                            </Link>
                            <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                                <p className="game-name">{game.name}</p>
                                <p className="game-price">{game.price}€</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nessun gioco trovato per "{searchQuery}".</p>
                )}
            </div>
        </div>
    );
}