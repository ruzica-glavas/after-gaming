import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faXbox } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


export default function Header() {
    return (
        <nav>
            <div>
                <div className="d-flex justify-space-between">
                    <div className="container">
                        <NavLink to="/"><img src="https://img.freepik.com/vettori-gratuito/vettore-di-gradiente-del-logo-colorato-uccello_343694-1365.jpg" style={{ width: "70px", height: "70px" }} /></NavLink>
                    </div>
                    <div className="container py-3">
                        <div className="d-flex justify-content-center pb-1">
                            <ul className='d-flex gap-3 align-items-center list-unstyled m-0'>
                                <li><FontAwesomeIcon icon={faDesktop} />  PC</li>
                                <li><FontAwesomeIcon icon={faPlaystation} /> Playstation</li>
                                <li><FontAwesomeIcon icon={faXbox} /> Xbox</li>
                            </ul>
                        </div>
                        <div className="container d-flex justify-content-center"><SearchBar /></div>
                    </div>
                    <div className="container d-flex justify-content-end gap-3">
                        <div className="d-flex justify-content-center">
                            <ul className='d-flex gap-3 align-items-center list-unstyled m-0'>
                                <NavLink to="/wishlist"><li><FontAwesomeIcon icon={faHeart} style={{ color: "grey", fontSize: "24px" }} /></li></NavLink>
                                <NavLink to="/carello"><li><FontAwesomeIcon icon={faCartShopping} style={{ color: "grey", fontSize: "24px" }} /></li></NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </nav>
    );
};