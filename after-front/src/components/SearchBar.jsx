import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {

    const [search, setSearch] = useState('');

    return (
        <>
            <div  className="d-flex gap-2">
                <input type="text"
                    className='form-control length-input'
                    placeholder='Minecraft, RPG, ...'
                />
                <button type="button" className="btn btn-primary rounded-circle" style={{ width: "45px", height: "45px" }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </>
    )

}

