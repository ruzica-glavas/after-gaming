import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams);
        if (inputValue.trim()) {
            newParams.set("q", inputValue.trim());
        } else {
            newParams.delete("q");
        }
        setSearchParams(newParams);
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 pb-4 pt-4 w-50 w-md-75 w-lg-50">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="form-control flex-grow-1 custom-placeholder"
                placeholder="Cerca gioco..."
                autoFocus
            />
            <button type="submit" className="btn btn-warning">
                Cerca
            </button>
        </form>
    );
}


