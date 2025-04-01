import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    function handleInput(e) {

        const query = e.target.value;

        setSearch(query);
        
        navigate(`/ricerca?q=${encodeURIComponent(query)}`);

    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="d-flex gap-2" style={{ height: "2rem" }}>
            <form onSubmit={handleSubmit} className="d-flex gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={handleInput}
                    className="form-control length-input"
                    placeholder="Minecraft, RPG, ..."
                />
                <button type="submit" className="btn btn-primary rounded-circle  d-flex align-items-center justify-content-center" style={{ width: "2rem", height: "2rem" }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    );
}

