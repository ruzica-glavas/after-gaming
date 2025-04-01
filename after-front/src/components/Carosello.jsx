import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carosello() {
  const [discountedGames, setDiscountedGames] = useState([]);

  useEffect(() => {
    // Recuperiamo tutti i giochi dal server (modifica l'API se necessario)
    fetch("http://localhost:3000/api/products") // Assicurati che questa API ritorni i dati corretti
      .then((res) => res.json())
      .then((data) => {
        // Filtra i giochi scontati (dove 'price' è inferiore a 'original_price')
        const scontati = data.filter(
          (game) => game.original_price && game.price < game.original_price
        );
        setDiscountedGames(scontati);
      })
      .catch((error) =>
        console.error("Errore nel recupero dei giochi scontati:", error)
      );
  }, []);

  const impostazioni = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...impostazioni}>
        {discountedGames.map((game) => (
          <div key={game.id} className="slide">
            <Link to={`/dettaglio/${game.id}`}>
              <img
                src={game.image_url || "/default-image.png"}
                alt={game.name}
                className="carousel-image"
              />
            </Link>
            <h3 className="game-title">{game.name}</h3>
            {/* Mostra anche il prezzo scontato */}
            <p className="game-price">
              <span className="original-price">{game.original_price}€</span>
              <span className="discounted-price">{game.price}€</span>
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
