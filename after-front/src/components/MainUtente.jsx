export default function MainUtente() {
    return (
        <div className="container text-white">
            <h2 className="text-center my-4">Inserisci i tuoi dati</h2>
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
                    <label className="form-label">Telefono</label>
                    <input type="tel" className="form-control" placeholder="Inserisci il telefono" />
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
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Invia</button>
                </div>
            </form>
        </div>
    );
}
