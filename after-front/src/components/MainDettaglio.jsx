import gioco from "../../data-test/data-test";

export default function MainDettaglio() {
    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-6">
                    <img src={gioco.image_url} alt={gioco.name} />
                </div>
                <div className="col-6">
                    <h1>{gioco.name}</h1>
                    <p>{gioco.description}</p>
                    <p>Prezzo: {gioco.price} €</p>
                    <p>Prezzo originale: {gioco.original_price} €</p>
                    <p>Disponibile per: {gioco.platform.join(", ")}</p>
                </div>
            </div>
        </div>
    );
}