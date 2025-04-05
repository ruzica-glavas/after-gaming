import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Effetto per impostare il valore iniziale di 'search' dal parametro URL
    useEffect(() => {
        const query = searchParams.get("q") || "";
        setSearch(query);
    }, [searchParams]); // Si attiva ogni volta che searchParams cambia

    function handleInput(e) {
        const query = e.target.value;

        setSearch(query);

        // Aggiorna l'URL con il nuovo parametro di ricerca
        navigate(`?q=${encodeURIComponent(query)}`);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="d-flex pb-4 pt-4">
            <input
                type="text"
                value={search}
                onChange={handleInput}
                className="form-control length-input custom-placeholder"
                placeholder="Cerca gioco..."
            />
        </div>
    );
}


