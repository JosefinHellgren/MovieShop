import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./movieslider.css";
import { useMediacategory } from 'react-responsive';
import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/movies";

const MovieSlider = ({ category, handleButtonClick, handleMovieClick }) => {
   
    const imgUrlStart = "https://image.tmdb.org/t/p/w185";
    const moviesObject = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMovies(category, dispatch)
    }, [category]);

    let content = null;

    switch (moviesObject.status) {
        case STATUS.NORMAL:
            content = null;
            break;
        case STATUS.FETCHING:
            content = null;
            break;
        case STATUS.SUCCESS:
            content = moviesObject.movies[category];
            console.log({content});
            console.log(category);
            break;
        default:
            content = null
    }

    return (
        <Slider className="slick-slider" slidesToShow={3} slidesToScroll={1} >
            {content &&
                content.map((movie, index) => (
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

    async function fetchMovies(category, dispatch) {
        const apiKey = "305f99214975faee28a0f129881c6ec9";
        const URL = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&region=SE`;
      
        dispatch(actions.isFetching());
      
        try {
          let response = await fetch(URL);
          let json = await response.json();
          let movies = json.results;
      
          const payload = {
            category,
            movies
          };
      
          dispatch(actions.success(payload));
        } catch {
          dispatch(actions.failure());
        }
      }
};

export default MovieSlider;