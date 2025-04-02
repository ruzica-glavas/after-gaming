import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext"; // Importa il contesto globale

export default function Ricerca() {
    const { products, loading, error } = useGlobalContext(); // Usa il contesto globale per i prodotti
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    useEffect(() => {
        if (searchQuery) {
            if (Array.isArray(products) && products.length > 0) {
                setFilteredGames(
                    products.filter((element) => {
                        const gameName = element.name || "";
                        return gameName.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                );
            } else {
                setFilteredGames([]); // Nessun prodotto disponibile
            }
        } else {
            setFilteredGames(products); // Mostra tutti i prodotti se la query è vuota
        }
    }, [searchQuery, products]); // Aggiungi 'products' come dipendenza

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="container">
            {searchQuery && <h4 className="px-4 pb-3">Risultati per: "{searchQuery}"</h4>}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
                {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <div key={game.id} className="col mb-4">
                            <Link to={`/dettaglio/${game.slug}`}>
                                <img
                                    src={game.image_url}
                                    alt={game.name}
                                    className="game-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/300x200?text=Immagine+non+disponibile';
                                    }}
                                />
                            </Link>
                            <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                                <p className="game-name">{game.name}</p>
                                <p className="game-price">
                                    {game.original_price && (
                                        <span className="original-price">{game.original_price}€</span>
                                    )}
                                    <span className="discounted-price">{game.price}€</span>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-4">
                        <p>Nessun gioco trovato per "{searchQuery}".</p>
                    </div>
                )}
            </div>
        </div>
    );
}

