import React from 'react'
import Carosello from './Carosello'
import UltimiArrivi from './UltimiArrivi.jsx'
import Tendenze from './Tendenze.jsx'
import { Link } from 'react-router-dom'
import WelcomePopup from './WelcomePopup.jsx'

export default function MainHomepage() {
    return (
        <>
            <WelcomePopup /> {/* <-- blocca la pagina finché non chiuso */}
            
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <h3 className='carousel-title text-white py-4 fw-bold'>------- IMPERDIBILI -------</h3>
                <Carosello />
            </div>

            <div>
                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className="text-white px-4 pb-3">Tendenze <Link to={`/tendenze`}><button className="link-button">{'\u2794'}</button></Link></h4>
                    <Tendenze />
                </div>
                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className="text-white px-4 pb-3">Ultime uscite <Link to={`/ultimi-arrivi`}><button className="link-button">{'\u2794'}</button></Link></h4>
                    <UltimiArrivi />
                </div>
            </div>
        </>
    );
}
