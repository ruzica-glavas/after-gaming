import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DoomGuy404 from "../public/imgs/ChatGPT Image 9 apr 2025, 11_15_46.png";

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-dark p-4">
                <img src={DoomGuy404} alt="" style={{ maxWidth: "300px" }} className="rounded" />
                <h2 className="mb-3 text-white pt-4">Oops! Pagina non trovata</h2>
                <p className="mb-4 text-secondary">
                    La pagina che stai cercando non esiste o è stata rimossa.
                </p>
                <Link to="/" className="btn order-button hover-gioco py-2 px-3 text-white">
                    Torna alla Home
                </Link>
            </div>
            <Footer />
        </>

    );
}