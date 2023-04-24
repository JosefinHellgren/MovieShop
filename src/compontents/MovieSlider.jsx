import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./movieslider.css";
import { useMediaQuery } from 'react-responsive';

const MovieSlider = ({ query, setMovie, handleButtonClick }) => {
    const [movies, setMovies] = useState([]);
    const apiKey = "305f99214975faee28a0f129881c6ec9";
    const imgUrlStart = "https://image.tmdb.org/t/p/w185";

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&language=en-US&region=SE`)
            .then((response) => response.json())
            .then((movies) => {
                console.log(movies.results);
                setMovies(movies.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [query]);

    const handleMovieClick = (movie) => {
        setMovie(movie);
        navigate("/movieinfo/");
    };



    return (
        <Slider className="slick-slider" slidesToShow={3} slidesToScroll={1} >
            {movies &&
                movies.map((movie, index) => (
                    <div key={index} className="slider_container">
                        <img
                            className="movie_poster"
                            src={imgUrlStart + movie.poster_path}
                            onClick={() => handleMovieClick(movie)}
                        />
                        <h6 className="movie-title">{movie.title}</h6>
                        <button className="payment_button" onClick={() => handleButtonClick(movie)}>
                            59kr
                        </button>
                    </div>
                ))}
        </Slider>
    );
};

export default MovieSlider;