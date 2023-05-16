
import { useNavigate } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import "./mainpage.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";




const MainPage = ({ onCategoryClick,  handleMovieClick }) => {

  const apiKey = "305f99214975faee28a0f129881c6ec9";

  //this line of code and the import of useDispatch is
  // needed to save and clear selectedmovie to redux
  let dispatch = useDispatch();

  //this useeffect clears the movie from redux 
  //when the pathname no longer is movieinfo or payment
  // meaning when the user clicks the "back-button"
  useEffect(() => {
    if (location.pathname !== "/movieinfo/" || location.pathname !== "/payment/") {
      
    }
  }, [location.pathname, dispatch]);

  return (
    <div className="mainpage_container">
     <section className="big_Movie_poster_section">
      <MovieSlider similar={false} movie_id="" genre_id="" title="Big Movie" category="popular" handleMovieClick={handleMovieClick}></MovieSlider>
     </section>
      <section className="popular_movies_section">
        <MovieSlider similar={false} movie_id="" genre_id="" title="Popular Movies" category="popular"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="romance_section">
        <MovieSlider similar={false} genre_id="10749" title="Romance" category="romance"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="comedy_section">
        <MovieSlider similar={false} genre_id="35" title="Comedy" category="comedy"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="toprated_movies_section">
        <MovieSlider similar={false} movie_id="" genre_id="" title="Top Rated Movies On IMDb" category="top_rated"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="action_section">
        <MovieSlider similar={false} genre_id="28" title="Action" category="action"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="now_playing_section">
        <MovieSlider similar={false} movie_id="" genre_id="" title="In Theaters Now" category="now_playing"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />
      </section>
      <section className="drama_section">
        <MovieSlider similar={false}  genre_id="18" title="Drama" category="drama"  handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick} />

      </section>
      
    </div>
  );
};

export default MainPage;
