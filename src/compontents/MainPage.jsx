import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import './mainpage.css'

const MainPage = (props) => {

    let navigate = useNavigate();

    const [popularMovies, setpopularMovies] = useState([]);
    const apiKey = "305f99214975faee28a0f129881c6ec9";
    const imgUrlStart = "https://image.tmdb.org/t/p/w185";

    //fetch movies
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
            .then((response) => response.json())
            .then((popularMovies) => {
                console.log(popularMovies.results);
                setpopularMovies(popularMovies.results)
            })
            .catch((error) => {
                console.log(error);
            })


    }, [])

    const handleMovieClick = (movie) => {
        props.setMovie(movie);
        navigate("/movieinfo/")
    }
    
    const handleButtonClick = (movie) =>{
        props.setMovie(movie);
        navigate("/payment/")
    }


    return (
        <div className="main_container">
            <section className="popular_movies_section">
                <h4>Popular Movies</h4>
                <Slider className="slick-slider" slidesToShow={12}>
                    {popularMovies && popularMovies.map((movie, index) => (
                        <div key={index} className="popular_movies_container" >
                            <img className="movie_poster" src={imgUrlStart + movie.poster_path} onClick={() => handleMovieClick(movie)} />
                            <button className="payment_button" onClick={()=> handleButtonClick(movie)}>199:- Buy </button>
                            <h6>{movie.title}</h6>
                        </div>
                    ))}
                </Slider>
            </section>
            <section className="toprated_movies_section"></section>
        </div>
    )
}

export default MainPage