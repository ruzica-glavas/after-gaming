import React from 'react'
import { useState, useEffect } from 'react'
import gamesData from '../../data-test/data-test.js'
import Carosello from './Carosello'
import UltimiArrivi from './UltimiArrivi.jsx'
import Tendenze from './Tendenze.jsx'

export default function MainHomepage() {

    const [gameList, setGameList] = useState([])

    useEffect(() => {
        setGameList(gamesData)
    }, [])

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <h3>Imperdibili</h3>
                <Carosello/>
            </div>
            <div>
                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className='px-4 pb-3'>Ultime uscite {'\u2192'}</h4>
                    <UltimiArrivi/>
                </div>
                
                <div className="container d-flex flex-column pt-5 pb-4">
                    <h4 className='px-4 pb-3'>Tendenze {'\u2192'}</h4>
                    <Tendenze/>
                </div>
            </div>
        </>
    )
};