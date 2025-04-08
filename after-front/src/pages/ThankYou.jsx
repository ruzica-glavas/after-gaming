import { Link } from "react-router-dom";

export default function ThankYou() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light p-4">
            <h1 className="display-4 fw-bold text-success">Grazie per il tuo acquisto! 🎉</h1>
            <p className="lead mb-3">
                La tua transazione è andata a buon fine. Riceverai una mail di conferma a breve.
            </p>
            <p className="mb-4 text-muted">
                Se hai domande, il nostro team di supporto è sempre a disposizione.
            </p>
            <Link to="/" className="btn btn-success">
                Torna alla Home
            </Link>
        </div>
    );
}