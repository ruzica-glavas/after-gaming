import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gamesData from '../../data-test/data-test.js'

export default function Tendenze() {
    const [latestGames, setLatestGames] = useState([])

    useEffect(() => {
        setLatestGames(gamesData)
    }, [])

    return (
        <div className="">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-6 mx-auto">
                {latestGames.map((game) => (
                    <div key={game.id}>
                        <Link to={`/dettaglio/${game.id}`}>
                            <img src={game.image_url} alt={game.title} className='game-image' />
                        </Link>
                        <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                            <p className='game-name'>{game.name}</p>
                            <p className='game-price'>{game.price}€</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}