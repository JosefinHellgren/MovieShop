import React, { useState, useEffect } from "react";
import Movie_wheel from "../images/movie-wheel.png";
import "./navbar.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as searchDropDownActions } from "../features/searchdropdown"
import { ImSearch } from "react-icons/im"
import SearchDropDown from "./SearchDropDown";
import { FiSettings } from "react-icons/fi";
import { AiOutlinePlayCircle } from 'react-icons/ai'

const Navbar = ({ onSearchClick, handleAccountStatus, createAccount, isUserIconVisible }) => {

  const pinkGradient = 'linear-gradient(to bottom, #d70dff 0%, #d70dff 80%, rgba(0, 0, 0, 0) 100%)';
  const blackGradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0) 100%';
  const TurkqioseGradient = 'linear-gradient(to bottom, #06acb8 0%, #06acb8 80%, rgba(0, 0, 0, 0) 100%)';
  const orangeGradient = 'linear-gradient(to bottom, #ff8400 0%, #ff8400 80%, rgba(0, 0, 0, 0) 100%)';
  const dropdownUl = document.querySelector('.navbar .dropdown ul');
  const apiKey = "305f99214975faee28a0f129881c6ec9";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let category = "search";

  const auth = getAuth();
  const db = firebase.firestore();
  const uid = localStorage.getItem('uid');
  const [userUID, setUserUID] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  let unsubscribe = () => {};
  const searchDropDown = useSelector(state => state.searchDropdown.searchDropDown);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
     
          setSignedIn(true);
          setUserUID(user.uid);
          localStorage.setItem('uid', user.uid);
        
      } else {
        setSignedIn(false);
        setUserUID(null);
        localStorage.removeItem('uid');
      }
    });
  }, [])

  useEffect(() => {

    if (uid) {
      setSignedIn(true);
      setUserUID(uid);
    } 
  }, []);
  




useEffect(() => {
  if (userUID && createAccount === 'normal') {
    const docRef = db.collection('users').doc(userUID);
    unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        changeBackground(data.background);
      } 
    });
  }

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
}, [userUID, createAccount]);



  useEffect(() => {
    
   if (createAccount === 'success') {

      const docRef = db.collection('users').doc(userUID);
      unsubscribe = docRef.onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          changeBackground(data.background);
          if (createAccount != 'normal') {
            handleAccountStatus('normal');
          }
        }
      });
    }
    return () => {
      if (!signedIn) {
        unsubscribe();
      }
    };
  }, [createAccount])


  useEffect(() => {

    if (userUID && createAccount === 'normal') {
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

  const handleSearchInputChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery !== '') {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${newQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
      dispatch(searchDropDownActions.showSearchDropDown());
    } else {
      dispatch(searchDropDownActions.hideSearchDropDown());
    }
  }

  const handleSearchClick = () => {
    onSearchClick(query, searchResults, category);
    setQuery('');
  }

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  const handleMovieClick = (movie) => {

    localStorage.setItem('lastSelectedMovie', JSON.stringify(movie))
    navigate("/movieinfo/");
  };

  const handleUserCircleClick = () => {
    navigate('/login');
  }

  const handlePlayButtonPressed = () => {
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
    setSignedIn(false);
    setUserUID(null);
    localStorage.removeItem('uid');
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
    navigate("/");
  }

  const renderButton = (isMobile, signedIn) => {

    if (!isUserIconVisible) {
      return null;
    } else if (isMobile) {
      return (
        <HiOutlineUserCircle
        className="user_icon"
        onClick={signedIn ? handlePlayButtonPressed : handleUserCircleClick}
      />
      );
    } else if (!isMobile) {
      return (
      <div className="user-icon-div" onClick={signedIn ? handlePlayButtonPressed : handleUserCircleClick}>
         <HiOutlineUserCircle
            className="user_icon_computer"
          /> 
          <h4>{signedIn ? "My Pages" : "Log in"}</h4>
        </div>
      )

    }
  };

  const renderSettingsButton = (isMobile) => {
    if (isMobile) {
      return (
        <summary role="button">
          <FiSettings className="settings_icon" />
        </summary>
      )
    } else {
      return (
        <summary role="button">
          <section className="settingsbtn-container" >
            <FiSettings className="settings-icon" />
            <h4>Settings</h4>
          </section>
        </summary>
      )
    }
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <section className="navbar-container">
        <img src={Movie_wheel} alt="Movie Wheel Logo" className="movie_wheel" onClick={handleMovWheelClick} />

      <div className="search_bar">
        <input type="text" value={query} placeholder="Search movies.." onChange={handleSearchInputChange} />
        <ImSearch className="search_icon" onClick={handleSearchClick} />
      </div>
      <section className={signedIn && !isUserIconVisible ? 'navbar_section' : 'navbar_section hide'}>
        <details className="dropdown">
          {renderSettingsButton(isMobile)}
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
      {renderButton(isMobile, signedIn)}

      </section>
      <section>
        <div className={`search_dropdown ${searchDropDown ? '' : 'hide'}`}>
          <SearchDropDown query={query} searchResults={searchResults} handleSearchClick={handleSearchClick} handleMovieClick={handleMovieClick} />
        </div>
      </section>
    </nav>
  );
}

export default Navbar;