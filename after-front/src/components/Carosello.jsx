import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import gamesData from '../../data-test/data-test.js'

export default function Carosello() {

    const [gameList, setGameList] = useState([])

    useEffect(() => {
        setGameList(gamesData)
    }, [])

    const impostazioni = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    }

    return (
        <div className="carousel-container">
            <Slider {...impostazioni}>
                {gameList.map((game) => (
                    <div key={game.id} className="slide">
                        <Link to={`/dettaglio/${game.id}`}>
                            <img src={game.image_url} alt={game.name} className='carousel-image' />
                        </Link>
                        <h3 className="game-title">{game.name}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    )
}