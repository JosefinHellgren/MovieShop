
import { useNavigate } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import "./mainpage.css";
import { useDispatch } from "react-redux";
import { actions as selectActions } from "../features/selectedmovie"
import { useEffect, useState } from "react";



const MainPage = ({ onCategoryClick,  handleMovieClick }) => {

  const apiKey = "305f99214975faee28a0f129881c6ec9";

  

  let navigate = useNavigate();

  //this line of code and the import of useDispatch is
  // needed to save and clear selectedmovie to redux
  let dispatch = useDispatch();
  

 

  //this useeffect clears the movie from redux 
  //when the pathname no longer is movieinfo or payment
  // meaning when the user clicks the "back-button"
  useEffect(() => {
    if (location.pathname !== "/movieinfo/" || location.pathname !== "/payment/") {
      dispatch(selectActions.clearMovie());
    }
  }, [location.pathname, dispatch]);

  return (
    <div className="mainpage_container">
     <section className="big_Movie_poster_section">
      <MovieSlider title="Big Movie" category="popular" handleMovieClick={handleMovieClick}></MovieSlider>
     </section>
      <section className="popular_movies_section">
        <MovieSlider title="Popular Movies" category="popular"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="toprated_movies_section">
        <MovieSlider title="Top Rated Movies On IMDb" category="top_rated"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="now_playing_section">
        <MovieSlider title="In Theaters Now" category="now_playing"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
    </div>
  );
};

export default MainPage;
