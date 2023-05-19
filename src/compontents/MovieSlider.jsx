import React, { useEffect } from "react";
import Slider from "react-slick";
import "./movieslider.css";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/movies";
import { useState } from "react";
import MovieGridItem from "./MovieGridItem";

const MovieSlider = ({ title, category, handleMovieClick, onCategoryClick, genre_id, movie_id, similar }) => {

    const [slidesToShow, setSlidesToShow] = useState(3);
    const moviesObject = useSelector(state => state.movies);
    const dispatch = useDispatch();


    const settings = {
        dots : true,
        infinite : true,
        sped: 500
    }
    
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

    /*  if (content !== null) {
        if (content && content.length === 0) {
            return <h4>No movies found for {title}</h4>;
        }
    }  */

     useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth <= 768 && title === "Big Movie" || window.innerWidth >= 768 && title === "Big Movie") {
                setSlidesToShow(1); // Show only one slide for Slider A on wider screens
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(4); // Show four slides for other sliders on wider screens
            } else {
                setSlidesToShow(3); // Show three slides on smaller screens
            }
        };

        window.addEventListener('resize', updateSlidesToShow);

        // Call the function initially to set the initial slidesToShow value
        updateSlidesToShow();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []); 

    return (
        <div className="movie_slider">

            {title !== 'Big Movie' && (
                <h4 onClick={handleCategoryClick}>{title} {'>'}</h4>
            )}
            <Slider {...settings} key={moviesObject.status} 
            className="slick-slider" swipeToSlide={true}
             slidesToShow={slidesToShow} slidesToScroll={1}
             
             
     >
                {content &&
                    content.map((movie, index) => (
                        <div key={index} className={`slider_container ${title === 'Big Movie' ? 'big-movie-slider' : ''}`}>
                            <MovieGridItem movie={movie} handleMovieClick={handleMovieClick} useBackDrop={title === "Big Movie"} />
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

            if (3 > page) {
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