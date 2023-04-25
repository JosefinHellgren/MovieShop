
import { useNavigate } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import "./mainpage.css";
import Navbar from "./NavBar"

const MainPage = (props) => {
  let navigate = useNavigate();

  const handleMovieClick = (movie) => {
    props.setMovie(movie);
    navigate("/movieinfo/");
  };

  const handleButtonClick = (movie) => {
    props.setMovie(movie);
    navigate("/payment/");
  };

  return (
    <div className="mainpage_container">
        <section>
            <Navbar/>
        </section>
      <section className="popular_movies_section">
        <h4>Popular Movies</h4>
        <MovieSlider query="popular" setMovie={handleMovieClick} handleButtonClick={handleButtonClick} />
      </section>
      <section className="toprated_movies_section">
        <h4>Top Rated Movies On IMDb</h4>
        <MovieSlider query="top_rated" setMovie={handleMovieClick} handleButtonClick={handleButtonClick} />
      </section>
      <section className="now_playing_section">
        <h4>In Theaters Now</h4>
        <MovieSlider query="now_playing" setMovie={handleMovieClick} handleButtonClick={handleButtonClick} />
      </section>
      
      
    </div>
  );
};

export default MainPage;

export const imgUrlStart = "https://image.tmdb.org/t/p/w185";
