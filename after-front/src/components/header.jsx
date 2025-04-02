import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faXbox } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import logo from "../public/imgs/logo_transparent.png";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import CartOffCanvas from "./CartOffCanvas";

export default function Header() {
  const { carrello, isCartOpen, closeCart } = useGlobalContext();

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

  return (
    <>
      <nav>
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
            <div className="container pt-1 pl-3">
              <div className="d-flex justify-content-center pb-1">
                <ul className="d-flex gap-3 align-items-center list-unstyled mb-0">
                  <li>
                    <FontAwesomeIcon icon={faDesktop} /> PC
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlaystation} /> Playstation
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faXbox} /> Xbox
                  </li>
                </ul>
              </div>
              <div className="container d-flex justify-content-center">
                <SearchBar />
              </div>
            </div>
            <div className="container d-flex justify-content-end gap-3">
              <div className="d-flex justify-content-center">
                <ul className="d-flex gap-3 align-items-center list-unstyled m-0">
                  <NavLink to="/wishlist">
                    <li>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "white", fontSize: "24px" }}
                      />
                    </li>
                  </NavLink>
                  <NavLink to="/carello">
                    <li>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ color: "white", fontSize: "24px" }}
                      />
                      <span className="ms-1 badge badge-outline fs-6">{carrello.length}</span>
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
