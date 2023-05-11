import React, { useState, useEffect } from "react";
import Movie_wheel from "../images/movie-wheel.png";
import PlayButton from "../images/play.png";
import "./navbar.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { actions as selectActions } from "../features/selectedmovie"
import {ImSearch} from "react-icons/im"
import { useLocation, useNavigate } from "react-router-dom";
import SearchDropDown from "./SearchDropDown";
import { useDispatch, useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { actions as searchDropDownActions } from "../features/searchdropdown"

const Navbar = ({onSearchClick}) => {
  const pinkGradient = 'linear-gradient(to bottom, #d70dff 0%, #d70dff 80%, rgba(0, 0, 0, 0) 100%)';
  const blackGradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0% rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0) 100%';
  const TurkqioseGradient = 'linear-gradient(to bottom, #06acb8 0%, #06acb8 80%, rgba(0, 0, 0, 0) 100%)';

  const apiKey = "305f99214975faee28a0f129881c6ec9";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const auth = getAuth();
  const db = firebase.firestore();
  const [userUID, setUserUID] = useState(null);

  const [signedIn, setSignedIn] = useState(false);

  const searchDropDown = useSelector(state => state.searchDropdown.searchDropDown);

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
        setUserUID(user.uid);
      } else {
        setSignedIn(false);
        setUserUID(null);
        document.body.style.backgroundColor = "black";
        document.querySelector('#root').style.backgroundColor = 'black';
        document.querySelector('.navbar').style.background = blackGradient;
      }
    });
  }, [])
  
  useEffect(() => {
    if (userUID) {
      const docRef = db.collection('users').doc(userUID);
      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          console.log('snapshot körs')
          const data = doc.data();
          changeBackground(data.background);
        } else {
          console.log('Dokumentet finns inte');
        }
      });
    }
  }, [userUID]);

  const changeBackground = (background) => {
    if (background === 'black') {
      document.body.style.backgroundColor = "black";
      document.querySelector('#root').style.backgroundColor = 'black';
      document.querySelector('.navbar').style.background = blackGradient;
    } else if (background === 'turquoise') {
      document.body.style.backgroundColor = "#06acb8";
      document.querySelector('#root').style.backgroundColor = '#06acb8';
      document.querySelector('.navbar').style.background = TurkqioseGradient;
    } else if (background === 'pink') {
      document.body.style.backgroundColor = "#d70dff";
      document.querySelector('#root').style.backgroundColor = '#d70dff';
      document.querySelector('.navbar').style.background = pinkGradient;
      document.querySelector('.navbar_section').style.backgroundColor = 'white !important';
    } else if (background === 'orange') {
      document.body.style.backgroundColor = "orange";
      document.querySelector('#root').style.backgroundColor = 'orange';
    }
  }

  const handleSearchInputChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  
    if (newQuery !== '') {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newQuery}`);
      const data = await response.json();
      console.log(data.results);
      setSearchResults(data.results);
      dispatch(searchDropDownActions.showSearchDropDown());
    } else {
      dispatch(searchDropDownActions.hideSearchDropDown());
    }
  }

  const handleSearchClick = () => {
    setQuery('');
    dispatch(searchDropDownActions.hideSearchDropDown());
    onSearchClick(query, searchResults);
  }

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  const handleMovieClick = (movie) => {
    dispatch(searchDropDownActions.hideSearchDropDown());
    //this is what sets the selectedmovie to redux
    dispatch(selectActions.selectMovie(movie));
    navigate("/movieinfo/");
  };
  
  const handleUserCircleClick = () => {
    dispatch(searchDropDownActions.hideSearchDropDown());
    navigate('/login');
  }

  const handlePlayButtonPressed = () => {
    dispatch(searchDropDownActions.hideSearchDropDown());
    navigate('/userpage')
  }

  const handleClick = (title) => {
    document.querySelector('.navbar_section').style.background = 'linear-gradient(to bottom, #d70dff 0%, #d70dff 80%, rgba(0, 0, 0, 0) 100%)';
    saveBackcolorFirestore(title);
      
  };

  const handleSignOutClick = () => {
    navigate('/');
    auth.signOut();
  }

  const handleMovWheelClick = () => {
   dispatch(searchDropDownActions.hideSearchDropDown());
    navigate("/");
  }

  const renderButton = () => {
    return signedIn ? <img src={PlayButton} 
    onClick = {handlePlayButtonPressed} 
    alt="Play Button" className="play_folder" /> :  
    <HiOutlineUserCircle className="user_icon" 
    onClick={handleUserCircleClick} />
  };

  return (
    <nav className="navbar">
      <section className="navbar-container">
        <img src={Movie_wheel} alt="Movie Wheel Logo" className="movie_wheel" onClick={handleMovWheelClick} />
      <div className="search_bar">
        <input type="text" value={query} placeholder="Search movies.." onChange={handleSearchInputChange} />
        <ImSearch className="search_icon" onClick={handleSearchClick} />
      </div>
      <section className="navbar_section">
        
        <details className="dropdown">
          <summary role="button">
            <FiSettings className="settings_icon"/>
          </summary>
          <ul>
            <li className="dropdown-title"> <strong> Change background to:</strong></li>
            <li onClick= {() => handleClick('black')}><a className="li-color"> <p className= "black-circle"></p>Black</a></li>
            <li onClick= {() => handleClick('turquoise')}><a className="li-color"> <p className="white-circle"></p>Turquoise</a></li>
            <li onClick= {() => handleClick('pink')}><a className="li-color"> <p className="pink-circle"></p>Pink</a></li>
            <li onClick= {() => handleClick('orange')}><a className="li-color"> <p className="orange-circle"></p>Orange</a></li>
            <li onClick={handleSignOutClick}><a >Sign out</a></li>
          </ul>
        </details>
      </section>
      {renderButton()}
      </section>
      <section>
      <div className={`search_dropdown ${searchDropDown ? '' : 'hide'}`}>
          <SearchDropDown searchResults={searchResults} handleSearchClick={handleSearchClick} handleMovieClick={handleMovieClick} />
        </div>
      </section>
      
    </nav>
    
  );
}

export default Navbar;