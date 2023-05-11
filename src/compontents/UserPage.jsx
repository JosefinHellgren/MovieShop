import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { actions } from "../features/selectedmovie";

import './userpage.css'


const UserPage = () => {

  const imgUrlStart = "https://image.tmdb.org/t/p/original"
  const [purchasedMovies, setPurchasedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [watchListIsEmpty, setwatchListIsEmpty] = useState(true);
  const [purchasedIsEmpty, setPurchasedIsEmpty] = useState(true);
  const dispatch = useDispatch();

  const db = firebase.firestore();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user hämtats')
        setCurrentUser(user);
      }
    });
  }, [])


  useEffect(() => {
    async function fetchPurchasedData() {
      if (currentUser != null) {
        const purchasedRef = db.collection('users').doc(currentUser.uid).collection('purchased');
        const querySnapshot = await purchasedRef.get();
        if (querySnapshot.empty) {
          setPurchasedIsEmpty(true)
        } else {
          setPurchasedIsEmpty(false);
          const purchasedMovies = querySnapshot.docs.map(doc => doc.data());
          setPurchasedMovies(purchasedMovies);
        }
      }
    }

    async function fetchWatchlistData() {
      if (currentUser != null) {
        const watchlistRef = db.collection('users').doc(currentUser.uid).collection('watchlist');
        const querySnapshot = await watchlistRef.get();
        if (querySnapshot.empty) {
          setwatchListIsEmpty(true)
        } else {
          setwatchListIsEmpty(false)
          const watchlistMovies = querySnapshot.docs.map(doc => doc.data());
          setWatchlistMovies(watchlistMovies);
        }
      }
    }
    fetchPurchasedData();
    fetchWatchlistData();
  }, [currentUser]);

  const handlePurchasedMovieClick = (movie) => {
    dispatch(actions.selectMovie(movie))

    navigate("/movieinfo/");
  }

  const renderPurchasedMovies = purchasedMovies && purchasedMovies.map((movie, i) => (
    <div key={i} className='purchased-item'>
      <section>
        <p className="purchased-title">Purchased</p>
        <img src={imgUrlStart + movie.poster_path}
          alt={movie.title}
          className='purchased-img'
          onClick={() => handlePurchasedMovieClick(movie)}
        />
      </section>
    </div>
  ));

  const renderWatchlistMovies = watchlistMovies && watchlistMovies.map((movie, i) => (
    <div key={i} className='watchlist-item'>
      <section>
        <img src={imgUrlStart + movie.poster_path}
          alt={movie.title}
          className='watchlist-img'
          onClick={() => handlePurchasedMovieClick(movie)}
        />
      </section>
    </div>
  ));

  return (
    <div className="user-page">
      <h3><br />My movies</h3>
      <section className="purchased-container">
        {renderPurchasedMovies}
        <p>{purchasedIsEmpty ? "You haven't bought any movies yet" : ""}</p>
      </section>
      <h3>My watchlist</h3>
      <section className="watchList-container">
      {renderWatchlistMovies}
      <p>{watchListIsEmpty ? "You haven't added any movies to your watchlist yet" : ""}</p>
        
      </section>
    </div>
  )
};

export default UserPage;