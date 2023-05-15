import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./movieslider.css";
import { useMediacategory } from 'react-responsive';
import { useDispatch, useSelector } from "react-redux";
import { STATUS, actions } from "../features/movies";
import MovieGridItem from "./MovieGridItem";
import { useNavigate } from "react-router-dom";

const MovieSlider = ({ title, category, handleMovieClick, onCategoryClick }) => {
    
    const [slidesToShow, setSlidesToShow] = useState(3);
    const moviesObject = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMovies(category, dispatch)
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


      

      useEffect(() => {
        const updateSlidesToShow = () => {
          if (window.innerWidth <= 768  && title === "Big Movie" || window.innerWidth >= 768 && title === "Big Movie") {
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
  <h4 onClick={handleCategoryClick}>{title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</h4>
)}
        <Slider key={moviesObject.status} className="slick-slider" slidesToShow={slidesToShow} slidesToScroll={1} >
            {content &&
                content.map((movie, index) => (
                    <div key={index} className={`slider_container ${title === 'Big Movie' ? 'big-movie-slider' : ''}`}>
                        <MovieGridItem movie={movie}  handleMovieClick={handleMovieClick} useBackDrop={title === "Big Movie"} />
                    </div>
                ))}
        </Slider>
        </div>
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