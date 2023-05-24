import React, { useEffect, useRef, useState } from "react";
import './movieInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fromPayment } from "../features/navigatePayment";
import MovieSlider from "./MovieSlider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



function MovieInfo({ onCategoryClick, handleMovieClick, toggleUserIconVisibility }) {

  const lastSelectedMovie = localStorage.getItem('lastSelectedMovie');
  const selectedMovie = JSON.parse(lastSelectedMovie);
  const rating = selectedMovie.vote_average;

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const auth = getAuth();
  const db = firebase.firestore();
  const user = auth.currentUser;
  const videoRef = useRef(null);
  const imgUrlStart = "https://image.tmdb.org/t/p/original";
  const navigatePayment = useSelector((state) => state.navigatePayment.payment);

  const [isPurchased, setIsPurchased] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [purchasedMovies, setPurchasedMovies] = useState([]);

  const SELECTED_BUTTON = {
    OVERVIEW : 'overview',
    TRAILER : 'trailer',
    COMMENTS : 'comments'
  }

  const [selectedBtnState, setselectedBtnState] = useState(SELECTED_BUTTON.OVERVIEW);

  //const [playing, setPlaying] = useState(false);
  // const videoRef = useRef(null);
 
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showOverview, setShowOverview] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [watchList, setWatchList] = useState('Add to watchlist');
  const [documentID, setDocumentID] = useState('');

  const [language, setLanguage] = useState(['']);


  const [isClicked, setIsClicked] = useState(false);


  const WATCHLIST_STATUS = {
    EXISTS: 'Remove from watchlist',
    EMPTY: 'Add to watchlist'
  }


  const checkMovieWatchList = () => {

    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('watchlist')
        .where('id', '==', selectedMovie.id)
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const documentId = doc.id;
            setDocumentID(documentId);
            setWatchList(WATCHLIST_STATUS.EXISTS);
          } else {
            setWatchList(WATCHLIST_STATUS.EMPTY);
            setDocumentID('');
          }
        });
    }
  };

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = checkMovieWatchList();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

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
        }else{
          setTrailerKey(null)
          
        }
      })
      .catch((error) => console.log(error));
  }, [selectedMovie.id]);


  useEffect(() => {
    toggleUserIconVisibility(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user hämtats')
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [])

  useEffect(() => {
    console.log('before async')
    async function fetchData() {
      if (currentUser != null) {
        console.log('aysync funktion user sant')
        console.log("user: ", currentUser)
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


  const scrollToTop =() => {
    console.log('scrolla uppåt')
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  },[])

  // find genre names for each genre ID in the movie's genre_ids array
  const genreNames = selectedMovie.genre_ids.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : "";
  });



    //Går till fullscreen när man dubbelklickar på video
    const handleFullscreenChange = () => {
      setIsFullscreen((prevState) => !prevState);
    };


  const handleBuy = () => {

 
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log('User is authenticated');
      navigate('/payment/');
    } else {
      console.log('User is not authenticated');
      dispatch(fromPayment());
      console.log(navigatePayment);
      navigate('/login');
    }

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
        db.collection("users").doc(user.uid).collection('watchlist').doc(documentID).delete()
          .then(() => {
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    } else {
      navigate('/login');
      console.log('navigering till login handle watch')
    }
  }

  const handleShowOverview = () => {
    setShowOverview(true);
    setShowTrailer(false);
    setShowComments(false);

    setselectedBtnState(SELECTED_BUTTON.OVERVIEW)

  };

  const handleShowTrailer = () => {
    setShowOverview(false);
    setShowTrailer(true);
    setShowComments(false);
    setselectedBtnState(SELECTED_BUTTON.TRAILER)
  };

  const handleShowComments = () => {
    setShowOverview(false);
    setShowTrailer(false);
    setShowComments(true);
    setselectedBtnState(SELECTED_BUTTON.COMMENTS)
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


  useEffect(() => {

    switch (selectedMovie.original_language) {
      case "en": setLanguage("English"); break;
      case "es": setLanguage("Spanish"); break;
      case "fr": setLanguage("French"); break;
      case "de": setLanguage("German"); break;
      case "it": setLanguage("Italian"); break;
      case "ja": setLanguage("Japanese"); break;
      case "ko": setLanguage("Korean"); break;
      case "pt": setLanguage("Portuguese"); break;
      case "ru": setLanguage("Russian"); break;
      case "zh": setLanguage("Chinese"); break;
      case "nl": setLanguage("Dutch"); break;
      case "sv": setLanguage("Swedish"); break;
      case "da": setLanguage("Danish"); break;
      case "no": setLanguage("Norwegian"); break;
      case "fi": setLanguage("Finnish"); break;
      case "pl": setLanguage("Polish"); break;
      case "tr": setLanguage("Turkish"); break;
      default: setLanguage(""); break;
    }
  }, [selectedMovie])


  return (
    <div className="movieinfo">
      <div className="movieinfocontainer">
        <h3>{selectedMovie.title}</h3>
        <div className="poster-container">
          <img className='poster-img' src={imgUrlStart + selectedMovie.poster_path} alt={selectedMovie.title} />
          <div className="movie-details">
            <div className="movieinfobackdrop">
              <img className='backdrop-img' src={imgUrlStart + selectedMovie.backdrop_path} />
            </div>
            <p className="movie-detail"><strong>Genres: </strong>{genreNames.join(", ")}</p>
            <p className="movie-detail"><strong>Language: </strong>{language}</p>
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
            <button onClick={handleBuy} className="movieinfobtn"><FontAwesomeIcon icon={faCartPlus} /> Buy</button>
            <button className="movieinfobtn" onClick={handleWatchlistClick}>{watchList}</button>
          </>
        )}
      </div>
      <div className="details-nav">

        <button className="details-btn" onClick={handleShowOverview}>
         {selectedBtnState === 'overview' ? <strong className="extra-bold">About</strong> : "About"}
        </button>
        <button className="details-btn" onClick={handleShowTrailer} onDoubleClick={handleFullscreenChange} >
        {selectedBtnState == 'trailer' ? <strong className="extra-bold">Trailer</strong> : "Trailer"}
        </button>
        <button className="details-btn" onClick={handleShowComments}>
        {selectedBtnState == 'comments' ? <strong className="extra-bold">Comments</strong> : "Comments"}
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
        <div className="comments">
          <Comments />
        </div>
      )}


      <section>
      <MovieSlider similar= {false} movie_id={selectedMovie.id} genre_id="" title="Recommended Movies" category="recommended" handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick}/>
      <MovieSlider similar={true} movie_id={selectedMovie.id} genre_id="" title="Similar Movies" category="similar" handleMovieClick={handleMovieClick} onCategoryClick={onCategoryClick}/>
      </section>
    </div>
  );
}

export default MovieInfo;
