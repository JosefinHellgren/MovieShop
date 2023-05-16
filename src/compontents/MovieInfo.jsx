
import React, { useEffect, useRef, useState } from "react";
import './movieInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faCartPlus, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fromPayment } from "../features/navigatePayment";
import { actions as searchDropDownActions } from "../features/searchdropdown"
import MovieSlider from "./MovieSlider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function MovieInfo({ onCategoryClick, handleButtonClick, handleMovieClick }) {
  
  //CILIA REDUX SELECTEDMOVIE
  //how to get the selectedmovie from redux, must also import useSelector from react-redux
  const selectedMovie = useSelector(
    (state) => state.selectedMovie.selectedMovie
  );
  // use the selectedMovie like this
  //console.log("movieinfo: " + selectedMovie.title);

  const [isPurchased, setIsPurchased] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [purchasedMovies, setPurchasedMovies] = useState([]);

  //const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  

  const [genres, setGenres] = useState([]);
  const rating = selectedMovie.vote_average;
  const [trailerKey, setTrailerKey] = useState(null);
  const [showOverview, setShowOverview] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [watchList, setWatchList] = useState('Add to watchlist');

  const imgUrlStart = "https://image.tmdb.org/t/p/original";
  const navigatePayment = useSelector((state) => state.navigatePayment.payment);
  const auth = getAuth();
  const db = firebase.firestore();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let documentId = '';

  const user = auth.currentUser;

  const WATCHLIST_STATUS = {
    EXISTS: 'Remove from watchlist',
    EMPTY: 'Add to watchlist'
  }


  const checkMovieWatchList = () => {
    if (user) {
      db.collection('users').doc(user.uid).collection('watchlist')
        .where('id', '==', selectedMovie.id)
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            documentId = doc.id;
            setWatchList(WATCHLIST_STATUS.EXISTS);
          } else {
            setWatchList(WATCHLIST_STATUS.EMPTY);
            documentId = '';
          }
        });
    }
  };


  if (user) {
    checkMovieWatchList();
  } else {
    console.log('user null')
  }

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


  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user hämtats')
        setCurrentUser(user);
      }
    });
  }, [])


  useEffect(() => {
    console.log('before async')
    async function fetchData() {
      if (currentUser != null) {
        console.log("user: " ,currentUser)
        const purchasedRef = db.collection('users').doc(currentUser.uid).collection('purchased');
        const querySnapshot = await purchasedRef.get();
        const purchasedMovies = querySnapshot.docs.map(doc => doc.data());
        setPurchasedMovies(purchasedMovies);
      }
    }
    fetchData();
  }, [currentUser]);


  useEffect(() => {
    setIsPurchased(!!purchasedMovies.find(movie => movie.id === selectedMovie.id));
  }, [purchasedMovies, selectedMovie.id]);







  // find genre names for each genre ID in the movie's genre_ids array
  const genreNames = selectedMovie.genre_ids.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : "";
  });




  const handleBuy = () => {
    
    dispatch(searchDropDownActions.hideSearchDropDown());

    //if we have a user, then we want to navigate to payment and set the navigatetoPayment statet till true.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/payment/');
      }
    })
    dispatch(fromPayment())
    console.log(navigatePayment)
    navigate("/login");
  }

  const handleWatchlistClick = () => {
    if (user != null) {

      if (watchList == WATCHLIST_STATUS.EMPTY) {
        db.collection("users").doc(user.uid).collection("watchlist").doc().set(selectedMovie)
          .then(() => {
            console.log("saved.");
          })
          .catch((error) => {
            console.error("error saving: ", error);
          });
      } else if (watchList === WATCHLIST_STATUS.EXISTS) {
        db.collection("users").doc(user.uid).collection('watchlist').doc(documentId).delete()
          .then(() => {
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    } else {
      navigate('/login');
    }
  }

  const handleShowOverview = () => {
    dispatch(searchDropDownActions.hideSearchDropDown());
    setShowOverview(true);
    setShowTrailer(false);
    setShowComments(false);
  };

  const handleShowTrailer = () => {
    dispatch(searchDropDownActions.hideSearchDropDown());
    setShowOverview(false);
    setShowTrailer(true);
    setShowComments(false);
  };

  const handleShowComments = () => {
    dispatch(searchDropDownActions.hideSearchDropDown());
    setShowOverview(false);
    setShowTrailer(false);
    setShowComments(true);
  };




 

  const handlePlayButtonClick = () => {
    console.log('Play button clicked');
    if (currentUser) {
      console.log('purchasedMovies:', purchasedMovies);
      const isPurchased = purchasedMovies.find((movie) => movie.id === selectedMovie.id);
      console.log(isPurchased)
      if (isPurchased) {
        navigate("/video");
        console.log('handlePlayButtonClick function called');
      } else {
        console.log("You haven't purchased this movie yet!");
      }
    }
  };




 
  return (
    <div className="movieinfo">
      <div className="movieinfocontainer">
      <h1>{selectedMovie.title}</h1>
     
     
      
      <div className="poster-container">
        
       
        <img className = 'poster-img' src={imgUrlStart + selectedMovie.poster_path} alt={selectedMovie.title} />
        <div className="movie-details">
          <div className="movieinfobackdrop">
            <img className = 'backdrop-img' src={imgUrlStart + selectedMovie.backdrop_path}  />
          </div>
    
            <p className="movie-detail"><strong>Genres: </strong>{genreNames.join(", ")}</p>
            <p className="movie-detail"><strong>Language: </strong>{selectedMovie.original_language}</p>
            <p className="movie-detail"><strong>Release: </strong>{selectedMovie.release_date}</p>
            <p><strong>Rating:</strong> {rating}</p>
       
          


          
        </div>
      </div>
      </div>

      <div className="movieinfobuybtns">

       
        
        {isPurchased ? (
          <button onClick={handlePlayButtonClick} className="movieinfobtn">Play</button>
            ) : (
              <>
              <button  onClick={handleBuy} className="movieinfobtn"><FontAwesomeIcon icon={faCartPlus} /> Buy</button>
              <button className="movieinfobtn" onClick={handleWatchlistClick}>{watchList}</button>
              </>
          
            )}

       
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

        <div className="info-overview">
          <p className="overview"><strong>Overview</strong> <br></br> {selectedMovie.overview}</p>

        </div>
      )}

      {showTrailer && (
        <div className="traileriframe">
        <iframe className="trailer" 
          ref={videoRef}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="YouTube video player"
          display="initial"
          webkitallowfullscreen="true"
          allowFullScreen={true}
          allow="autoplay; encrypted-media"
        ></iframe>
        </div>
      )}

      {showComments && (
        <div>
          <Comments />
        </div>
      )}
      <section>
      <MovieSlider onClick={window.scrollTo(0, 0)} similar= {false} movie_id={selectedMovie.id} genre_id="" title="Recommended Movies" category="recommended" handleButtonClick={handleButtonClick} handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick}/>
      <MovieSlider onClick={window.scrollTo(0, 0)} similar={true} movie_id={selectedMovie.id} genre_id="" title="Similar Movies" category="similar" handleButtonClick={handleButtonClick} handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick}/>
      </section>
    </div>
  );

}

export default MovieInfo;
