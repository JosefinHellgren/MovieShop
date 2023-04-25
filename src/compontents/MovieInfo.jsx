import React, { useEffect, useState } from "react";
import { imgUrlStart } from "./MainPage";
import style from './movieInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp , faCartPlus , faThumbsDown } from '@fortawesome/free-solid-svg-icons'


function MovieInfo(props) {
  const [genres, setGenres] = useState([]);
  const { movie } = props;
  const rating = movie.vote_average;

  useEffect(() => {
    // fetch movie genres from API
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=305f99214975faee28a0f129881c6ec9&language=en-US")
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres);
      })
      .catch(error => console.log(error));
  }, []);

  // find genre names for each genre ID in the movie's genre_ids array
  const genreNames = props.movie.genre_ids.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : "";
  });

  return (
    <div className="movieinfo">
    <h1>{props.movie.title}</h1>
    <div className="poster-container">
      <img src={imgUrlStart + props.movie.poster_path} alt={props.movie.title} />
      <div className="movie-details">
        <p className="movie-detail"><strong>Genres: </strong>{genreNames.join(", ")}</p>
        <p className="movie-detail"><strong>Language: </strong>{props.movie.original_language}</p>
        <p className="movie-detail"><strong>Release: </strong>{props.movie.release_date}</p>  
        <p><strong>Rating:</strong> {rating}</p>
        <div className="details-nav">
        <button className="ratebtn"><FontAwesomeIcon icon={faThumbsUp} /></button>
        <button className="ratebtn"><FontAwesomeIcon icon={faThumbsDown} /></button>
        </div>
     
      </div>

      
      
    </div>
     
     <div className="movieinfobuybtns">
          <button className="movieinfobtn" onClick={() => handleBuy(movie)}><FontAwesomeIcon icon={faCartPlus} />Buy 199Kr</button>
          <button className="movieinfobtn" onClick={() => handleAddtolist(movie)}>+ Add to watch list</button>
     </div>
          
          <div className="details-nav">
          <button className="details-btn">About</button>
          <button className="details-btn">Trailer</button>
          <button className="details-btn">Comments</button>
          </div>
          <p className="overview">Overview: {props.movie.overview}</p>


  </div>
  );
  
}



export default MovieInfo;

