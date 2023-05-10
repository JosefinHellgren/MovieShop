import React, { useEffect } from "react";
import Slider from "react-slick";
import "./movieslider.css";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/movies";
import MovieGridItem from "./MovieGridItem";

const MovieSlider = ({ title, category, handleButtonClick, handleMovieClick, onCategoryClick, genre_id }) => {
   
    const moviesObject = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMovies(genre_id, category, dispatch)
    }, []);

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
            break;
        default:
            content = null
    }

    const handleCategoryClick = () => {
        onCategoryClick(title, content);
      }

    return (
        <div className="movie_slider">
        <h4 onClick={handleCategoryClick} >{title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'>'}  </h4>
        <Slider key={moviesObject.status} className="slick-slider" slidesToShow={3} slidesToScroll={1} >
            {content &&
                content.map((movie, index) => (
                    <div key={index} className="slider_container">
                        <MovieGridItem movie={movie} handleButtonClick={handleButtonClick} handleMovieClick={handleMovieClick} />
                    </div>
                ))}
        </Slider>
        </div>
    );

    async function fetchMovies( genre_id, category, dispatch) {
        const apiKey = "305f99214975faee28a0f129881c6ec9";

        let URL = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&region=SE`;

        if (genre_id !== ""){
            URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=SE&with_genres=${genre_id}`;
        }

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