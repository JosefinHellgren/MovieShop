import React, { useState } from "react";
import Logo from "../images/movie_wheel.png";
import SearchIcon from "../images/search_icon.png";
import PlayButton from "../images/play.png";
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const auth = getAuth();
  const [signedIn, setSignedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
      console.log('setSginedIn körs - to true')
     // auth.signOut();
    } else {
      setSignedIn(false);
      console.log('setSginedIn körs - to false')
    }
  });

  const handleUserCircleClick = () => {
    navigate('/login');
  }

  const handlePlayButtonPressed = () => {
    navigate('/userpage')
  }

  const renderButton = () => {
    return signedIn ? <img src={PlayButton} onClick = {handlePlayButtonPressed} alt="Play Button" className="play_folder" /> :  <HiOutlineUserCircle className="user_icon" onClick={handleUserCircleClick} />
  };


  return (
    <nav className="navbar">
      <img src={Logo} alt="Movie Wheel Logo" className="movie_wheel"  />
      <div className="search_bar">
        <input type="text" placeholder="Search movies..." />
        <img src={SearchIcon} alt="Search icon" className="search_icon" />
      </div>
      {renderButton()}
     
    </nav>
  );
}

export default Navbar;