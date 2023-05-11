
import React, { useState, useEffect } from "react";

import Movie_wheel from "../images/movie-wheel.png";
import PlayButton from "../images/play.png";
import "./navbar.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HiOutlineUserCircle } from "react-icons/hi";
import { actions as selectActions } from "../features/selectedmovie"
import { ImSearch } from "react-icons/im"
import { useNavigate } from "react-router-dom";
import SearchDropDown from "./SearchDropDown";
import { useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";


const Navbar = ({ onSearchClick }) => {
  const pinkGradient = 'linear-gradient(to bottom, #d70dff 0%, #d70dff 80%, rgba(0, 0, 0, 0) 100%)';
  const blackGradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0) 100%';
  const TurkqioseGradient = 'linear-gradient(to bottom, #06acb8 0%, #06acb8 80%, rgba(0, 0, 0, 0) 100%)';
  const orangeGradient = 'linear-gradient(to bottom, #ff8400 0%, #ff8400 80%, rgba(0, 0, 0, 0) 100%)';
  const dropdownUl = document.querySelector('.navbar .dropdown ul');
  const apiKey = "305f99214975faee28a0f129881c6ec9";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = firebase.firestore();
  const [userUID, setUserUID] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  let unsubscribe = () => { };


  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
        setUserUID(user.uid);
        console.log('useEffect onauth körs')
      } else {
        setSignedIn(false);
        setUserUID(null);
      }
    });
  }, [])


  useEffect(() => {
    if (userUID) {
      const docRef = db.collection('users').doc(userUID);
      unsubscribe = docRef.onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          changeBackground(data.background);
        } 
      });
    }
    return () => {
      unsubscribe();
    };
  }, [userUID]);

  const changeBackground = (background) => {
    console.log('change background körs')
    if (background === 'black') {
      document.body.style.backgroundColor = "black";
      document.querySelector('#root').style.backgroundColor = 'black';
      dropdownUl.style.background = 'black';
      document.querySelector('.navbar-container').style.background = blackGradient;
    } else if (background === 'turquoise') {
      document.body.style.backgroundColor = "#06acb8";
      document.querySelector('#root').style.backgroundColor = '#06acb8';
      dropdownUl.style.background = '#06acb8';
      document.querySelector('.navbar-container').style.background = TurkqioseGradient;
    } else if (background === 'pink') {
      document.body.style.backgroundColor = "#d70dff";
      document.querySelector('#root').style.backgroundColor = '#d70dff';
      dropdownUl.style.background = '#d70dff';
      document.querySelector('.navbar-container').style.background = pinkGradient;
    } else if (background === 'orange') {
      document.body.style.backgroundColor = '#ff8400';
      document.querySelector('#root').style.backgroundColor = '#ff8400';
      dropdownUl.style.background = '#ff8400';
      document.querySelector('.navbar-container').style.background = orangeGradient;
    }
  }

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

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
    setShowSearchDropdown(false);
    onSearchClick(query, searchResults);
  }

  const handleMovieClick = (movie) => {
    setShowSearchDropdown(false);
    //this is what sets the selectedmovie to redux
    console.log('handleMovieclick körs')
    dispatch(selectActions.selectMovie(movie));
    
    navigate("/movieinfo/");
  };

  const handleUserCircleClick = () => {
    setShowSearchDropdown(false);
    navigate('/login');
  }

  const handlePlayButtonPressed = () => {
    setShowSearchDropdown(false);
    navigate('/userpage')
  }

  const handleClick = (title) => {
    saveBackgroundLocalStorage(title);
    saveBackcolorFirestore(title);
  };

  const handleSignOutClick = () => {
    document.body.style.backgroundColor = "black";
    document.querySelector('#root').style.backgroundColor = 'black';
    document.querySelector('.navbar-container').style.background = blackGradient;
    const dropdown = document.querySelector('.dropdown');
    dropdown.removeAttribute('open');
    unsubscribe();
    navigate('/');
    auth.signOut();
  }

  const saveBackcolorFirestore = (background) => {
    const userUID = auth.currentUser.uid;

    db.collection("users").doc(userUID).set({
      background: background
    }, { merge: true })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  const saveBackgroundLocalStorage = (background) => {
    localStorage.setItem('background', background);
  }

  const handleMovWheelClick = () => {
    setShowSearchDropdown(false);
    navigate("/");
  }

  const renderButton = () => {
    return signedIn ? <img src={PlayButton}
      onClick={handlePlayButtonPressed}
      alt="Play Button" className="play_folder" /> :
      <HiOutlineUserCircle className="user_icon"
        onClick={handleUserCircleClick} />
  };

  return (
    <nav className="navbar">
      <section className="navbar-container">
        <img src={Movie_wheel} alt="Movie Wheel Logo" className="movie_wheel" onClick={handleMovWheelClick} />
        <div className="search_bar">
          <input type="text" placeholder="Search movies..." onChange={handleSearchInputChange} />
          <ImSearch className="search_icon" onClick={handleSearchClick} />
        </div>
        <section className={signedIn ? 'navbar_section' : 'navbar_section hide'}>

          <details className="dropdown">
            <summary role="button">
              <FiSettings className="settings_icon" />
            </summary>
            <ul>
              <li className="dropdown-title"> <strong> Change background to:</strong></li>
              <li onClick={() => handleClick('black')}><a className="li-color"> <p className="black-circle"></p>Black</a></li>
              <li onClick={() => handleClick('turquoise')}><a className="li-color"> <p className="white-circle"></p>Turquoise</a></li>
              <li onClick={() => handleClick('pink')}><a className="li-color"> <p className="pink-circle"></p>Pink</a></li>
              <li onClick={() => handleClick('orange')}><a className="li-color"> <p className="orange-circle"></p>Orange</a></li>
              <li onClick={handleSignOutClick}><a >Sign out</a></li>
            </ul>
          </details>
        </section>
        {renderButton()}
      </section>
      <section>
        <div className={`search_dropdown ${showSearchDropdown ? "" : "hide"}`}>
          <SearchDropDown searchResults={searchResults} handleSearchClick={handleSearchClick} handleMovieClick={handleMovieClick} />
        </div>
      </section>

    </nav>

  );
}

export default Navbar;