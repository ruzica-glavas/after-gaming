import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import SearchBar from "./SearchBar";
import Tendenze from "./Tendenze";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faList } from "@fortawesome/free-solid-svg-icons"; // Importa icone per griglia e lista

export default function Ricerca() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false); // Cambiato a false
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const platformFilter = searchParams.get("platform");
  const priceFilter = searchParams.get("price") || "asc";
  const [viewMode, setViewMode] = useState("grid");

  // Rimuovi handleSearchQueryChange dato che ora è gestito nel componente SearchBar

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:3000/api/search';
        
        // Aggiungi i parametri solo se sono presenti
        const params = new URLSearchParams();
        if (searchQuery) {
          params.append('query', searchQuery);
        }
        if (platformFilter) {
          params.append('platform', platformFilter);
        }
        if (priceFilter) {
          params.append('sort', `price_${priceFilter}`);
        }
  
        // Aggiungi i parametri all'URL solo se ce ne sono
        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
  
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Si è verificato un errore');
        }
        
        setGames(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGames();
  }, [searchQuery, platformFilter, priceFilter]);

  if (loading) return <div className="text-center py-4">Caricamento in corso...</div>;
  if (error) return <div className="text-center py-4 text-danger">Si è verificato un errore nel caricamento dei giochi.</div>;

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handlePlatformChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set("platform", e.target.value);
    } else {
      newParams.delete("platform");
    }
    setSearchParams(newParams);
  };
  
  const handlePriceChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set("price", e.target.value);
    } else {
      newParams.delete("price");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container">
      <div className="container d-flex justify-content-center">
        <SearchBar/>
      </div>

      <div className="d-flex justify-content-center gap-4 mb-4">
        <select value={platformFilter || ""}  onChange={handlePlatformChange} className="form-select w-25">
          <option value>Piattaforma</option>
          <option value="PC">PC</option>
          <option value="PS5">Playstation</option>
          <option value="Xbox">Xbox</option>
        </select>

        <select value={priceFilter}  onChange={handlePriceChange} className="form-select w-25">
          <option value>Prezzo</option>
          <option value="asc">Prezzo crescente</option>
          <option value="desc">Prezzo decrescente</option>
        </select>

        {/* Bottoni per cambiare la visualizzazione */}
        <div className="view d-flex gap-2">
          <button
            className={`btn ${viewMode === "grid" ? "btn-warning" : "btn-secondary"}`}
            onClick={() => handleViewModeChange("grid")}
          >
            <FontAwesomeIcon icon={faCubes} />
          </button>
          <button
            className={`btn ${viewMode === "list" ? "btn-warning" : "btn-secondary"}`}
            onClick={() => handleViewModeChange("list")}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
      </div>

      <div>
        <h4 className="container text-white">{games.length} risultati</h4>
      </div>

      {/* Visualizzazione in griglia */}
      {viewMode === "grid" && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
          {games.length > 0 ? (
            games.map((game) => {
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
          ) : searchQuery ? (
            <div className="text-white py-2 w-100">
              <p className="fs-4">Ops! Sembra che il gioco che cerchi non ci sia...</p>
              <p className="text-white pb-3 fs-5">Ma potrebbero piacerti questi 😉</p>
              <span><Tendenze /></span>
            </div>
          ) :null}
        </div>
      )}

      {/* Visualizzazione in lista */}
      {viewMode === "list" && (
        <div className="d-flex flex-column bg-black rounded mb-2 list-view">
          {games.length > 0 ? (
            games.map((game) => {
              const discount =
                game.original_price && game.price < game.original_price
                  ? Math.round(((game.original_price - game.price) / game.original_price) * 100)
                  : 0;

              return (
                <Link to={`/dettaglio/${game.slug}`} key={game.id} className="list-group-item bg-dark d-flex align-items-center mx-1 my-1 p-2 rounded">
                  <div className="game-image-wrapper-list">
                    <img
                      src={game.image_url}
                      alt={game.name}
                      className="game-image-list"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Immagine+non+disponibile";
                      }}
                    />
                  </div>
                  <div className="ms-3 w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="game-name mb-1 text-white">{game.name}</h5>
                      <p className="game-price">
                        {game.original_price && (
                          <span className="original-price">{game.original_price}€</span>
                        )}
                        <span className="discounted-price fs-3">{game.price}€</span>
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1 text-secondary fs-5">{game.platform}</p>
                      <p className="mb-1 text-white">{game.description}</p>
                      {discount > 0 && (
                        <span className="discount-badge-list">-{discount}%</span>
                      )}
                    </div>
                  </div>
                  <hr className="text-white" />
                </Link>
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
      )}
    </div>
  );
}
