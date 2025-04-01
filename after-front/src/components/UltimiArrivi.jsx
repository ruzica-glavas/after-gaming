import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../contexts/GlobalContext";

export default function UltimiArrivi() {
    const { products } = useGlobalContext();
    const [latestGames, setLatestGames] = useState([]);

    useEffect(() => {
        console.log("Prodotti ricevuti:", products);
        
        if (Array.isArray(products) && products.length > 0) {
            const risultatoGiochi = [...products]
                .filter((game) => game.created_at)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 6);
    
            setLatestGames(risultatoGiochi);
            console.log("Giochi filtrati e ordinati:", risultatoGiochi);
        }
    }, [products]);

    return (
        <div className="">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
                {latestGames.length > 0 ? (
                    latestGames.map((game) => (
                        <div key={game.id}>
                            <Link to={`/dettaglio/${game.id}`}>
                                <img src={game.image_url} alt={game.name} className='game-image' />
                            </Link>
                            <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                                <p className='game-name'>{game.name}</p>
                                <p className='game-price'>{game.price}€</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nessun gioco disponibile.</p>
                )}
            </div>
        </div>
    );
}
