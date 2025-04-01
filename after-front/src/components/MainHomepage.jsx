import React from 'react'
import Carosello from './Carosello'
import UltimiArrivi from './UltimiArrivi.jsx'
import Tendenze from './Tendenze.jsx'

export default function MainHomepage() {

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <h3 className='text-white'>Imperdibili</h3>
                <Carosello />
            </div>
            <div>
                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className="px-4 pb-3 text-white">Ultime uscite {'\u2192'}</h4>
                    <UltimiArrivi />
                </div>

                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className="px-4 pb-3 text-white">Tendenze {'\u2192'}</h4>
                    <Tendenze />
                </div>
            </div>
        </>
    );
}