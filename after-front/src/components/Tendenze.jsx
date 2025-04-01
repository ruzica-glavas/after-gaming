import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tendenze() {
  const [tendenzeGames, setTendenzeGames] = useState([]);

  useEffect(() => {
    // Recupera tutti i giochi dal server
    fetch("http://localhost:3000/api/products") // Assicurati che questa API ritorni i dati corretti
      .then((res) => res.json())
      .then((data) => {
        // Calcola lo sconto per ogni gioco e ordina in base allo sconto maggiore
        const gamesWithDiscount = data.map((game) => {
          const discount =
            game.original_price && game.price < game.original_price
              ? ((game.original_price - game.price) / game.original_price) * 100
              : 0;
          return { ...game, discount };
        });

        // Ordina i giochi in base allo sconto (dal maggiore al minore)
        gamesWithDiscount.sort((a, b) => b.discount - a.discount);

        // Seleziona i primi 6 giochi con lo sconto maggiore
        const topDiscountedGames = gamesWithDiscount.slice(0, 6);

        setTendenzeGames(topDiscountedGames);
      })
      .catch((error) =>
        console.error("Errore nel recupero dei giochi:", error)
      );
  }, []);

  return (
    <div className="">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
        {tendenzeGames.map((game) => (
          <div key={game.id} className="col mb-4">
            <Link to={`/dettaglio/${game.slug}`}>
              <img
                src={game.image_url || "/default-image.png"}
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
        ))}
      </div>
    </div>
  );
}
