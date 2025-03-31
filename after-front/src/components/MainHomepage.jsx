export default function MainHomepage() {
    return (
        <>
            <div className="container d-flex flex-column justify-content-center">
                <h2 className="text-center">Imperdibile</h2>
                <img className="align-self-center" src="https://pbs.twimg.com/media/GmmT0BqW4AA28TI.jpg:large" style={{ width: "500px", height: "300px" }} alt=""/>
            </div>
            <div className="container d-flex justify-content-center gap-3 pt-4">
                <div>
                    <p>Ultime uscite {'\u2192'}</p>
                    <img src="https://pbs.twimg.com/media/GmmT0BqW4AA28TI.jpg:large" style={{ width: "300px", height: "200px" }} alt=""/>
                </div>
                <hr style={{width: "2px", height: "245px", backgroundColor: "black", border: "none", margin: "0 10px"}} />
                <div>
                    <p>In tendenza {'\u2192'}</p>
                    <img src="https://pbs.twimg.com/media/GmmT0BqW4AA28TI.jpg:large" style={{ width: "300px", height: "200px" }} alt=""/>
                </div>
            </div>

        </>

    )
};