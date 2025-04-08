import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center vh-50 bg-dark p-4">
            <h1 className="display-1 fw-bold" style={{'color': '#ff8800'}}>404</h1>
            <h2 className="mb-3 text-white">Oops! Pagina non trovata</h2>
            <p className="mb-4 text-secondary">
                La pagina che stai cercando non esiste o è stata rimossa.
            </p>
            <Link to="/" className="btn order-button hover-gioco py-2 px-3 text-white">
                Torna alla Home
            </Link>
        </div>
    );
}