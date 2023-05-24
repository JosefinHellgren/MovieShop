import React, { useEffect } from "react";
import Slider from "react-slick";
import "./movieslider.css";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/movies";
import { useState } from "react";
import MovieGridItem from "./MovieGridItem";

const MovieSlider = ({ title, category, handleMovieClick, onCategoryClick, genre_id, movie_id, similar }) => {

    const [slidesToShow, setSlidesToShow] = useState(3);
    const [slidesToScroll,setSlidesToScroll] = useState(3);
    const [autoplay,setAutoplay] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    const moviesObject = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('');


    const settings = {
        dots: true,
        infinite: true,
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
            break;
        default:
            content = null
    }

    const handleCategoryClick = () => {
        onCategoryClick(title, content, category);
    }

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth <= 768 && title === "Big Movie" || window.innerWidth >= 768 && title === "Big Movie") {
                setSlidesToShow(1); 
                setSlidesToScroll(1);
                setAutoplay(true)
                // Show only one slide for Slider A on wider screens
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(4); // Show four slides for other sliders on wider screens
                setSlidesToScroll(4);
            } else {
                setSlidesToShow(3); 
                setSlidesToScroll(3)
                setIsMobile(true)// Show three slides on smaller screens
                console.log("isMobile should slide to scroll")
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

            {content && content.length > 0 ? (
                <Slider key={moviesObject.status} className="slick-slider" slidesToShow={slidesToShow}
                    slideToSwipe={isMobile}
                    touchThreshold={10}
                    slidesToScroll={slidesToShow} autoplay={autoplay} >
                    {content.map((movie, index) => (

                        <div key={index} className={`slider_container ${title === 'Big Movie' ? 'big-movie-slider' : ''}`}>
                            <MovieGridItem movie={movie} handleMovieClick={handleMovieClick} useBackDrop={title === "Big Movie"} />
                        </div>
                    ))}
                </Slider>
            ) : (
                <h5>{errorMsg}</h5>
            )}
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
        } else if( title === "Big Movie"){
            URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        }

        dispatch(actions.isFetching());
        setErrorMsg('Loading movies...');

        try {
            let response = await fetch(URL);
            let json = await response.json();
            let movies = json.results;

            if (4 > page) {
                let nextPageMovies = await fetchMovies(movie_id, genre_id, category, dispatch, similar, page + 1);
                movies = movies.concat(nextPageMovies);
            }


            if (movies.length === 0) {
                setErrorMsg('Could not find any recommended movies');
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