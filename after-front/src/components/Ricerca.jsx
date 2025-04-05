import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import SearchBar from "./SearchBar";
import Tendenze from "./Tendenze";
import { Link } from "react-router-dom";

export default function Ricerca() {
  const { products, loading, error } = useGlobalContext();
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const platformFilter = searchParams.get("platform"); // Filtro della piattaforma
  const priceFilter = searchParams.get("price") || "asc"; // Filtro per prezzo (ascendente/discendente)

  // Funzione per aggiornare il filtro della piattaforma
  const handlePlatformChange = (e) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), platform: e.target.value });
  };

  // Funzione per aggiornare il filtro del prezzo
  const handlePriceChange = (e) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), price: e.target.value });
  };

  // Funzione per aggiornare la query di ricerca
  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), q: query });
  };

  useEffect(() => {
    // Filtra i giochi in base alla query di ricerca, alla piattaforma e al prezzo
    let filtered = products.filter((game) => {
      const matchQuery = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPlatform = platformFilter ? game.platform === platformFilter : true;
      return matchQuery && matchPlatform;
    });

    // Filtra i giochi in base al prezzo (ascendente/discendente)
    if (priceFilter === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredGames(filtered);
  }, [searchQuery, platformFilter, priceFilter, products]);

  if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
  if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

  return (
    <div className="container">
      <div className="container d-flex justify-content-center">
        {/* Barra di ricerca, passiamo value e onChange per sincronizzare l'input con l'URL */}
        <SearchBar value={searchQuery} onChange={handleSearchQueryChange} />
      </div>

      <div className="d-flex justify-content-center gap-4 mb-4">
        {/* Filtro per la piattaforma */}
        <select value={platformFilter || ""} onChange={handlePlatformChange} className="form-select w-25">
          <option selected>Piattaforma</option>
          <option value="PC">PC</option>
          <option value="PS5">Playstation</option>
          <option value="Xbox">Xbox</option>
        </select>

        {/* Filtro per il prezzo */}
        <select value={priceFilter} onChange={handlePriceChange} className="form-select w-25">
          <option selected>Prezzo</option>
          <option value="asc">Prezzo crescente</option>
          <option value="desc">Prezzo decrescente</option>
        </select>
      </div>

      <div>
        <h4 className="container text-white">{filteredGames.length} risultati</h4>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => {
            const discount =
              game.original_price && game.price < game.original_price
                ? Math.round(((game.original_price - game.price) / game.original_price) * 100)
                : 0;

            return (
              <div key={game.id} className="col mb-4">
                <div className="game-image-wrapper-ricerca">
                  {discount > 0 && (
                    <span className="discount-badge-ricerca">-{discount}%</span>
                  )}
                  <Link to={`/dettaglio/${game.slug}`}>
                    <img
                      src={game.image_url}
                      alt={game.name}
                      className="game-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Immagine+non+disponibile";
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
              </div>
            );
          })
        ) : (
          <div className="text-white py-2 w-100">
            <p className="fs-4">Ops! Sembra che il gioco che cerchi non ci sia...</p>
            <p className="text-white pb-3 fs-5">Ma potrebbero piacerti questi 😉</p>
            <span><Tendenze /></span>
          </div>
        )}
      </div>
    </div>
  );
}