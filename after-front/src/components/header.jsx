import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/dettaglio">Dettaglio</NavLink>
                </li>
                <li>
                    <NavLink to="/carello">Carello</NavLink>
                </li>
                <li>
                    <NavLink to="/wishlist">Wishlist</NavLink>
                </li>
                <li>
                    <NavLink to="/utente">Utente</NavLink>
                </li>
            </ul>
        </nav>
    );
};
