import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { faDesktop, faCartShopping, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../public/imgs/logo_transparent.png";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import CartOffCanvas from "./CartOffCanvas";

export default function Header() {
  const { wishlist, carrello, isCartOpen, closeCart } = useGlobalContext();
  const navigate = useNavigate(); // Per navigare e aggiornare l'URL

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Funzione per aggiornare la query string nell'URL con il filtro della piattaforma
  const handlePlatformFilter = (platform) => {
    // Aggiungi o aggiorna il parametro della piattaforma nell'URL
    navigate(`/ricerca?q=&platform=${platform}`);
  };

  return (
    <>
      <nav className="px-4 pl-3 pr-3">
        <div>
          <div className="d-flex justify-space-between">
            <div className="container py-3">
              <NavLink to="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "7rem", height: "3rem" }}
                />
              </NavLink>
            </div>
            <div className="container d-flex justify-content-center align-items-center">
              <NavLink to="/ricerca">
                <li className="hover-icon-small">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </li>
              </NavLink>
              <div className="container d-flex justify-content-center align-items-center pt-1 pl-3 search-platform">
                <div className="pb-1">
                  <ul className="d-flex gap-2 list-unstyled mb-0">
                    <li className="hover-gioco fs-5" onClick={() => handlePlatformFilter("PC")}>
                      <FontAwesomeIcon icon={faDesktop} className="icona-gioco" /> PC
                    </li>
                    <li className="hover-gioco fs-5" onClick={() => handlePlatformFilter("PS5")}>
                      <FontAwesomeIcon icon={faPlaystation} className="icona-gioco" /> Playstation
                    </li>
                    <li className="hover-gioco fs-5" onClick={() => handlePlatformFilter("Xbox")}>
                      <FontAwesomeIcon icon={faXbox} className="icona-gioco" /> Xbox
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container d-flex justify-content-end gap-3">
              <div className="d-flex justify-content-center">
                <ul className="d-flex gap-3 align-items-center list-unstyled m-0">
                  <NavLink to="/ricerca">
                    <li className="hover-icon-big">
                      <FontAwesomeIcon icon={faMagnifyingGlass}
                        style={{ color: "white", fontSize: "24px" }}
                      />
                    </li>
                  </NavLink>
                  <NavLink to="/wishlist">
                    <li className="hover-icon">
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "white", fontSize: "24px" }}
                      />
                      <span className="ms-0 badge badge-outline fs-6 wish-badge">{wishlist.length}</span>
                    </li>
                  </NavLink>
                  <NavLink to="/carello">
                    <li className="hover-icon">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ color: "white", fontSize: "24px" }}
                      />
                      <span className="ms-0 badge badge-outline fs-6 cart-badge">{carrello.length}</span>
                    </li>
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CartOffCanvas show={isCartOpen} handleClose={closeCart} />
    </>
  );
}
