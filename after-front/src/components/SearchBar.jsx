import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

    const handleInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Aggiorna i parametri di ricerca mantenendo gli altri parametri esistenti
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set("q", value);
        } else {
            newParams.delete("q");
        }
        setSearchParams(newParams);
    };

    return (
        <div className="d-flex pb-4 pt-4">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInput}
                className="form-control length-input custom-placeholder"
                placeholder="Cerca gioco..."
                autoFocus
            />
        </div>
    );
}


