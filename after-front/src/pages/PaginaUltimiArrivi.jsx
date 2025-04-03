import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../contexts/GlobalContext";

export default function UltimiArrivi() {
    const { products, loading, error } = useGlobalContext();
    const [latestGames, setLatestGames] = useState([]);

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0) {
            const giochiDaOrdinare = [...products].map(game => ({
                ...game,
                created_at: game.created_at || new Date().toISOString()
            }));

            try {
                const risultatoGiochi = giochiDaOrdinare
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 20);

                setLatestGames(risultatoGiochi);
            } catch (err) {
                console.error("Errore durante l'ordinamento:", err);
                setLatestGames(products.slice(0, 20));
            }
        }
    }, [products]);

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="container">
            <h4 className="px-4 pb-3 text-white">Ultime uscite</h4>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
                {latestGames.length > 0 ? (
                    latestGames.map((game) => {
                        const discount = game.original_price && game.price < game.original_price
                            ? Math.round(((game.original_price - game.price) / game.original_price) * 100)
                            : 0;

                        return (
                            <div key={game.id} className="col mb-4">
                                <div className="game-image-wrapper-arrivi">
                                    {discount > 0 && (
                                        <span className="discount-badge-arrivi">-{discount}%</span>
                                    )}
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
                                </div>
                                <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                                    <p className="game-name text-white">{game.name}</p>
                                    <p className="game-price">
                                        {game.original_price && (
                                            <span className="original-price">{game.original_price}€</span>
                                        )}
                                        <span className="discounted-price">{game.price}€</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center py-4">
                        <p>Nessun gioco disponibile.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
