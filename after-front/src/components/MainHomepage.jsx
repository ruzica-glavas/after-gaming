import React from 'react'
import Carosello from './Carosello'
import UltimiArrivi from './UltimiArrivi.jsx'
import Tendenze from './Tendenze.jsx'
import { Link } from 'react-router-dom'

export default function MainHomepage() {

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <h3 className='carousel-title'>Imperdibili</h3>
                <Carosello />
            </div>
            <div>
                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className="text-white px-4 pb-3">Tendenze <Link to={`/tendenze`}><button className="btn rounded-circle fs-7" style={{backgroundColor: "#f06c00" }}>{'\u2192'}</button></Link></h4>
                    <Tendenze />
                </div>
                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className="text-white px-4 pb-3">Ultime uscite <Link to={`/ultimi-arrivi`}><button className="btn rounded-circle fs-7" style={{backgroundColor: "#f06c00" }}>{'\u2192'}</button></Link></h4>
                    <UltimiArrivi />
                </div>
            </div>
        </>
    );
}
