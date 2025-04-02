export default function MainUtente() {
    return (
        <div className="container text-white py-4 my-4 rounded" style={{ backgroundColor: "var(--dark-color)" }}>
            <h2 className="text-center my-4">Inserisci i tuoi dati</h2>
            
            {/* Dati personali */}
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" placeholder="Inserisci il nome" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Cognome</label>
                    <input type="text" className="form-control" placeholder="Inserisci il cognome" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Inserisci l'email" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Età</label>
                    <input type="number" className="form-control" placeholder="Inserisci l'età" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Sesso</label>
                    <select className="form-select">
                        <option value="">Seleziona...</option>
                        <option value="maschio">Maschio</option>
                        <option value="femmina">Femmina</option>
                        <option value="altro">Altro</option>
                    </select>
                </div>

                {/* Dati di fatturazione */}
                <div className="col-md-6">
                    <label className="form-label">Indirizzo di fatturazione</label>
                    <input type="text" className="form-control" placeholder="Inserisci l'indirizzo di fatturazione" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">CAP</label>
                    <input type="text" className="form-control" placeholder="Inserisci il CAP" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Città</label>
                    <input type="text" className="form-control" placeholder="Inserisci la città" />
                </div>

                {/* Riepilogo ordine */}
                <div className="col-12 my-4">
                    <h4>Riepilogo ordine</h4>
                    <ul>
                        <li>Prodotto 1 - €29.99</li>
                        <li>Prodotto 2 - €19.99</li>
                    </ul>
                    <hr />
                    <p><strong>Totale: €49.98</strong></p>
                </div>

                {/* Bottone per inviare i dati */}
                <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "var(--orange-color)" }}>Invia</button>
                </div>
            </form>
        </div>
    );
}
