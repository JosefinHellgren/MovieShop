
import { useNavigate } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import "./mainpage.css";
import Navbar from "./NavBar"
import { useDispatch, useSelector } from "react-redux";

import { actions as selectActions } from "../features/selectedmovie"
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import SearchDropDown from "./SearchDropDown";


import { fromPayment } from "../features/navigatePayment";
import { getAuth,onAuthStateChanged } from "firebase/auth";

const MainPage = (props) => {


  const apiKey = "305f99214975faee28a0f129881c6ec9";
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchPageResults, setSearchPagResults] = useState([]);

  const [query, setQuery] = useState('');
  const [searchWord, setSearchWord] = useState('');


  const navigatePayment = useSelector((state) => state.navigatePayment.payment);

  let navigate = useNavigate();

 

  //this line of code and the import of useDispatch is
  // needed to save and clear selectedmovie to redux
  let dispatch = useDispatch();
  const auth = getAuth();

  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        console.log('we have a logged in user')
        //auth.signOut();
      } else {
        setUser(false);
        console.log('No logged in user')
      }
    });
}, []);

  const handleMovieClick = (movie) => {
    //this is what sets the selectedmovie to redux
    dispatch(selectActions.selectMovie(movie));
    navigate("/movieinfo/");
  };

  const handleButtonClick = (movie) => {
   //this is what sets the selectedmovie to redux
    dispatch(selectActions.selectMovie(movie));

    
    //if we have a user navigate to Payment:

    if(user){
      navigate("/payment/");
   }
    else{
      //set state to true
      console.log("the state"+navigatePayment);
      dispatch(fromPayment())
      navigate("/login");
    }

    //if we doesnt have a user, navigate to login:
  };

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
  );
};

export default MainPage;
