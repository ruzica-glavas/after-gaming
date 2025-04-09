import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ThankYou() {
    return (
        <>
            <Header />
            <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 thank-you p-4">
                <h1 className="display-4 fw-bold" style={{ 'color': '#ff8800' }}>Grazie per il tuo acquisto! 🎉</h1>
                <p className="lead text-white mb-3">
                    La tua transazione è andata a buon fine. Riceverai una mail di conferma a breve.
                </p>
                <p className="mb-4 text-secondary">
                    Se hai domande, il nostro team di supporto è sempre a disposizione.
                </p>
                <Link to="/" className="btn order-button hover-gioco py-2 px-3 text-white">
                    Torna alla Home
                </Link>
            </div>
            <Footer />
        </>

    );
}