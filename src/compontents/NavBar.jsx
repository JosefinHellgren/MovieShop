import React from "react";
import Logo from "../images/movie_wheel.png";
import SearchIcon from "../images/search_icon.png";
import PlayButton from "../images/play.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={Logo} alt="Movie Wheel Logo" className="movie_wheel"  />
      <div className="search_bar">
        <input type="text" placeholder="Search movies..." />
        <img src={SearchIcon} alt="Search icon" className="search_icon" />
      </div>
      <img src={PlayButton} alt="Play Button" className="play_folder" />
    </nav>
  );
}

export default Navbar;