import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../contexts/GlobalContext";

export default function UltimiArrivi() {
    const { products, loading, error } = useGlobalContext();
    const [latestGames, setLatestGames] = useState([]);

    useEffect(() => {
        console.log("Prodotti ricevuti:", products);
        console.log("Tipo di products:", typeof products, Array.isArray(products));

        if (Array.isArray(products) && products.length > 0) {
            // Crea una copia sicura dei prodotti
            const giochiDaOrdinare = [...products].map(game => ({
                ...game,
                // Se non esiste created_at, usa la data corrente o l'id come fallback
                created_at: game.created_at || new Date().toISOString()
            }));

            try {
                const risultatoGiochi = giochiDaOrdinare
                    .sort((a, b) => {
                        // Controlla se le date sono valide
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);

                        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                            // Se le date non sono valide, ordina per id
                            return b.id - a.id;
                        }

                        return dateB - dateA;
                    })
                    .slice(0, 6);

                console.log("Giochi filtrati e ordinati:", risultatoGiochi);
                setLatestGames(risultatoGiochi);
            } catch (err) {
                console.error("Errore durante l'ordinamento:", err);
                // Fallback: prendi i primi 6 giochi senza ordinamento
                setLatestGames(products.slice(0, 6));
            }
        }
    }, [products]);

    if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
    if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

    return (
        <div className="">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
                {latestGames && latestGames.length > 0 ? (
                    latestGames.map((game) => (
                        <div key={game.id} className="col mb-4">
                            {/* Modifica il link per usare lo slug invece dell'id */}
                            <Link to={`/dettaglio/${game.slug}`}>
                                <img
                                    src={game.image_url}
                                    alt={game.name}
                                    className='game-image'
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
                        <p>Nessun gioco disponibile.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
