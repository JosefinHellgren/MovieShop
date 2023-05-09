import React, { useEffect, useState, useMemo } from "react";
import Logo from "../images/movie_wheel.png";
import Movie_wheel from "../images/movie-wheel.png";
import SearchIcon from "../images/search_icon.png";
import PlayButton from "../images/play.png";
import "./navbar.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import {ImSearch} from "react-icons/im"
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const auth = getAuth();
  const db = firebase.firestore();
  const [userUID, setUserUID] = useState(null);

  const [signedIn, setSignedIn] = useState(false);

  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
        setUserUID(user.uid);
      } else {
        setSignedIn(false);
        setUserUID(null);
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
    const pinkGradient = 'linear-gradient(to bottom, #d70dff 0%, #d70dff 80%, rgba(0, 0, 0, 0) 100%)';
    const blackGradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0% rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0) 100%';
    const TurkqioseGradient = 'linear-gradient(to bottom, #06acb8 0%, #06acb8 80%, rgba(0, 0, 0, 0) 100%)';
    

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
  
  const handleUserCircleClick = () => {
    navigate('/login');
  }

  const handlePlayButtonPressed = () => {
    navigate('/userpage')
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
      {/* <img src={Logo} alt="Movie Wheel Logo" className="movie_wheel"  /> */}
      <img src={Movie_wheel} alt="Movie Wheel Logo" className="movie_wheel"  />
      <div className="search_bar">
        <input type="text" placeholder="Search movies..." />
        {/* <img src={SearchIcon} alt="Search icon" className="search_icon" /> */}
        <ImSearch className="search_icon" />
      </div>
      {renderButton()}
    </nav>
  );
}

export default Navbar;