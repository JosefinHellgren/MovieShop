
import { useNavigate } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import "./mainpage.css";
import Navbar from "./NavBar"
import { useDispatch, useSelector } from "react-redux";
import {actions as selectActions} from "../features/selectedmovie"
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

const MainPage = (props) => {

  const apiKey = "305f99214975faee28a0f129881c6ec9";
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  let navigate = useNavigate();

  //this line of code and the import of useDispatch is
  // needed to save and clear selectedmovie to redux
  let dispatch = useDispatch();

  const handleMovieClick = (movie) => {
    props.setMovie(movie);

    //this is what sets the selectedmovie to redux
    dispatch(selectActions.selectMovie(movie)); 

    navigate("/movieinfo/");
  };

  const handleButtonClick = (movie) => {
    props.setMovie(movie);

    //this is what sets the selectedmovie to redux
    dispatch(selectActions.selectMovie(movie));
    
    navigate("/payment/");
  };

  //this useeffect clears the movie from redux 
  //when the pathname no longer is movieinfo or payment
  // meaning when the user clicks the "back-button"
  useEffect(() => {
    if (location.pathname !== "/movieinfo/" || location.pathname !== "/payment/" ) {
      dispatch(selectActions.clearMovie());
    }
  }, [location.pathname, dispatch]);

  const handleSearchInputChange = async (event) => {
    
    setQuery(event.target.value);
    if (query !== '') {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
      const data = await response.json();
      console.log(data.results);
      setSearchResults(data.results);
      setShowSearchPage(true);
    } else {
      setShowSearchPage(false);
    }
  }

  return (
    <div className="mainpage_container">
        <section>
            <Navbar handleSearchInputChange={handleSearchInputChange}/>
        </section>
        <div className={`search_page ${showSearchPage ? "" : "hide"}`}>
          <SearchResults query={query} searchResults={searchResults} />
        </div>
        <div className={`initial_page ${showSearchPage ? "hide" : ""}`}>
      <section className="popular_movies_section">
        <h4>Popular Movies</h4>
        <MovieSlider category="popular" handleButtonClick={handleButtonClick} handleMovieClick={handleMovieClick} />
      </section>
      <section className="toprated_movies_section">
        <h4>Top Rated Movies On IMDb</h4>
        <MovieSlider category="top_rated" handleButtonClick={handleButtonClick} handleMovieClick={handleMovieClick} />
      </section>
      <section className="now_playing_section">
        <h4>In Theaters Now</h4>
        <MovieSlider category="now_playing" handleButtonClick={handleButtonClick} handleMovieClick={handleMovieClick} />
      </section>
      </div>
    </div>
  );
};

export default MainPage;

export const imgUrlStart = "https://image.tmdb.org/t/p/w185";
