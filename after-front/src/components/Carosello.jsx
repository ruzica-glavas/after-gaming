import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carosello() {
  const [discountedGames, setDiscountedGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products") 
      .then((res) => res.json())
      .then((data) => {
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
    dots: false,  // Rimosso i puntini sotto il carosello
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Mostra sempre solo una slide
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
            <Link to={`/dettaglio/${game.slug}`} className="game-link">
              <div className="image-wrapper">
                <img
                  src={game.image_url}
                  alt={game.name}
                  className="carousel-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Immagine+non+disponibile";
                  }}
                />
              </div>
              <h3 className="game-title">{game.name}</h3>
              <p className="game-price">
                <span className="original-price">{game.original_price}€</span>
                <span className="discounted-price">{game.price}€</span>
              </p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
