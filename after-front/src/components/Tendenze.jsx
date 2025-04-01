import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tendenze() {
  const [tendenzeGames, setTendenzeGames] = useState([]);

  useEffect(() => {
    // Recupera tutti i giochi dal server
    fetch("http://localhost:3000/api/products") // Assicurati che questa API ritorni i dati corretti
      .then((res) => res.json())
      .then((data) => {
        // Seleziona un numero casuale di giochi (ad esempio 6)
        const randomGames = getRandomGames(data, 6);
        setTendenzeGames(randomGames);
      })
      .catch((error) =>
        console.error("Errore nel recupero dei giochi:", error)
      );
  }, []);

  // Funzione per ottenere giochi casuali
  const getRandomGames = (gamesArray, count) => {
    let shuffled = gamesArray.sort(() => 0.5 - Math.random()); // Mischia l'array
    return shuffled.slice(0, count); // Seleziona i primi "count" giochi
  };

  return (
    <div className="">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
        {tendenzeGames.map((game) => (
          <div key={game.id}>
            <Link to={`/dettaglio/${game.id}`}>
              <img
                src={game.image_url || "/default-image.png"}
                alt={game.name}
                className="game-image"
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
