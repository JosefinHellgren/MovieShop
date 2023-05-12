import React, { useEffect } from "react";
import Slider from "react-slick";
import "./movieslider.css";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/movies";
import MovieGridItem from "./MovieGridItem";

const MovieSlider = ({ title, category, handleButtonClick, handleMovieClick, onCategoryClick, genre_id, movie_id, similar }) => {

    const moviesObject = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMovies(movie_id, genre_id, category, dispatch, similar)
    }, [title, movie_id, similar]);

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
        case STATUS.FAILURE:
            content = <p>No movies available for this category</p>;
            break;
        default:
            content = null
    }

    const handleCategoryClick = () => {
        onCategoryClick(title, content);
    }

    if (content !== null) {
        if (content && content.length === 0) {
            return <h4>No movies found for {title}</h4>;
          }
      }

    
    return (
        <div className="movie_slider">
            <h4 onClick={handleCategoryClick} >{title} {'>'}  </h4>
            
            <Slider key={moviesObject.status} className="slick-slider" slidesToShow={3} slidesToScroll={1} >
                {content && content.map((movie, index) => (
                        <div key={index} className="slider_container">
                            <MovieGridItem movie={movie} handleButtonClick={handleButtonClick} handleMovieClick={handleMovieClick} />
                        </div>
                    ))}
            </Slider>
        </div>
    );

    async function fetchMovies(movie_id, genre_id, category, dispatch, similar, page = 1) {
        const apiKey = "305f99214975faee28a0f129881c6ec9";
        let URL = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&region=SE&page=${page}`;
      
        if (genre_id !== "") {
          URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=SE&with_genres=${genre_id}&page=${page}`;
        } else if (similar === true) {
          URL = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&language=en-US&region=SE&page=${page}`;
        } else if (movie_id !== "") {
          URL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}&language=en-US&region=SE&page=${page}`;
        }
      
        dispatch(actions.isFetching());
      
        try {
          let response = await fetch(URL);
          let json = await response.json();
          let movies = json.results;
      
          // Check if there are more pages of results
          if (3 > page) {
            // If so, fetch the next page and add the results to the existing array of movies
            let nextPageMovies = await fetchMovies(movie_id, genre_id, category, dispatch, similar, page + 1);
            movies = movies.concat(nextPageMovies);
          }
      
          const payload = {
            category,
            movies,
          };
      
          dispatch(actions.success(payload));
          return movies;
        } catch {
          dispatch(actions.failure());
          return [];
        }
      }
};

export default MovieSlider;