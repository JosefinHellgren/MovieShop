import React, { useEffect, useState } from "react";
import './movieInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp , faCartPlus , faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';




function MovieInfo(props) {
  

  //CILIA REDUX SELECTEDMOVIE
 //how to get the selectedmovie from redux, must also import useSelector from react-redux
 const selectedMovie = useSelector(state => state.selectedMovie.selectedMovie);
 // use the selectedMovie like this
 console.log("movieinfo: " + selectedMovie.title);


  const [genres, setGenres] = useState([]);
  const { movie } = props;
  const rating = selectedMovie.vote_average; // ändring här!


 const [trailerKey, setTrailerKey] = useState(null);
 const [showOverview, setShowOverview] = useState(true);
 const [showTrailer, setShowTrailer] = useState(false);
 const [showComments, setShowComments] = useState(false);

 const imgUrlStart = "https://image.tmdb.org/t/p/w185";



  useEffect(() => {
    // fetch movie genres from API
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=305f99214975faee28a0f129881c6ec9&language=en-US"
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => console.log(error));

    // fetch movie trailer from API
    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=305f99214975faee28a0f129881c6ec9&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        const trailer = data.results.find(
          (result) => result.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((error) => console.log(error));
  }, [selectedMovie.id]);

  // find genre names for each genre ID in the movie's genre_ids array
  const genreNames = selectedMovie.genre_ids.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : "";
  });


  const handleShowOverview = () => {
    setShowOverview(true);
    setShowTrailer(false);
    setShowComments(false);
  };

  const handleShowTrailer = () => {
    setShowOverview(false);
    setShowTrailer(true);
    setShowComments(false);
  };

  const handleShowComments = () => {
    setShowOverview(false);
    setShowTrailer(false);
    setShowComments(true);
  };

  

  return (
    <div className="movieinfo">
    <h1>{selectedMovie.title}</h1>
    <div className="poster-container">
      <img src={imgUrlStart + selectedMovie.poster_path} alt={selectedMovie.title} />
      <div className="movie-details">
        <p className="movie-detail"><strong>Genres: </strong>{genreNames.join(", ")}</p>
        <p className="movie-detail"><strong>Language: </strong>{selectedMovie.original_language}</p>
        <p className="movie-detail"><strong>Release: </strong>{selectedMovie.release_date}</p>  
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
        <button className="details-btn" onClick={handleShowOverview}>
          About
        </button>
        <button className="details-btn" onClick={handleShowTrailer}>
          Trailer
        </button>
        <button className="details-btn" onClick={handleShowComments}>
          Comments
        </button>
      </div>
         

      {showOverview && (
        <div className="">
          <p className="overview"><strong>Overview</strong> <br></br> {selectedMovie.overview}</p>
        </div>
      )}

      {showTrailer && (
        <Container>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </Container>
      )}

      {showComments && (
        <div>
          <h1>HEJ detta är Comments</h1>
        </div>
      )}
    </div>
  );
  
}



export default MovieInfo;

