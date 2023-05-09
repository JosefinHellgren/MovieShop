
import { useNavigate } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import "./mainpage.css";
import Navbar from "./NavBar"
import { useDispatch, useSelector } from "react-redux";
import { actions as selectActions } from "../features/selectedmovie"
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import SearchDropDown from "./SearchDropDown";

const MainPage = (props) => {

  const apiKey = "305f99214975faee28a0f129881c6ec9";
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchPageResults, setSearchPagResults] = useState([]);

  const [query, setQuery] = useState('');
  const [searchWord, setSearchWord] = useState('');

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
    if (location.pathname !== "/movieinfo/" || location.pathname !== "/payment/") {
      dispatch(selectActions.clearMovie());
    }
  }, [location.pathname, dispatch]);

  const handleSearchInputChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  
    if (newQuery !== '') {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newQuery}`);
      const data = await response.json();
      console.log(data.results);
      setSearchResults(data.results);
      setShowSearchDropdown(true);
    } else {
      setShowSearchDropdown(false);
    }
  }

  const handleSearchClick = () => {
    setSearchWord(query);
    setSearchPagResults(searchResults);
    setShowSearchDropdown(false);
    setShowSearchPage(true);
  }

  return (
    <div className="mainpage_container">
      <section>
        <Navbar handleSearchInputChange={handleSearchInputChange} handleSearchClick={handleSearchClick} />
        <div className={`search_dropdown ${showSearchDropdown ? "" : "hide"}`}>
          <SearchDropDown searchResults={searchResults} handleSearchClick={handleSearchClick} handleMovieClick={handleMovieClick} />
        </div>
        <div className={showSearchPage ? "" : "hide"}>
          <SearchResults query={searchWord} searchResults={searchPageResults} handleMovieClick={handleMovieClick} handleButtonClick={handleButtonClick}/>
        </div>
      </section>

      <div className={showSearchPage ? "hide" : ""} >
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
