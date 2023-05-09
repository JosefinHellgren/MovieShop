import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../features/selectedmovie";
import './userpage.css'
import Logo from "../images/movie_wheel.png";
import movie_wheel from "../images/movie-wheel.png";
import { FiSettings } from "react-icons/fi";
import {AiOutlineMenu} from "react-icons/ai";


const UserPage = () => {

  const imgUrlStart = "https://image.tmdb.org/t/p/w185"
  const [purchasedMovies, setPurchasedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [emptyWatchList, setEmptyWatchList] = useState(true);
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
    async function fetchData() {
      if (currentUser != null) {
        const purchasedRef = db.collection('users').doc(currentUser.uid).collection('purchased');
        const querySnapshot = await purchasedRef.get();
        const purchasedMovies = querySnapshot.docs.map(doc => doc.data());
        setPurchasedMovies(purchasedMovies);
      }
    }
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    console.log('useffect fetch watchlist körs')
    async function fetchData() {
      if (currentUser != null) {
            const purchasedRef = db.collection('users').doc(currentUser.uid).collection('watchlist');
            const querySnapshot = await purchasedRef.get();
            if (querySnapshot.empty) {
              console.log('watchlist finns inte')
            } else {
              console.log('watchlist finns')
            }
          }
        }
        fetchData();
    }, [currentUser]);

    const handlePurchasedMovieClick = (movie) => {
      dispatch(actions.selectMovie(movie))

      navigate("/movieinfo/");
    }

    const handleMovWheelClick = () => {
      navigate("/");
    }

  const saveBackcolorFirestore = (background) => {
    const userUID = auth.currentUser.uid;
        
    db.collection("users").doc(userUID).set({
      background : background
      }, {merge: true})
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
  }

  const handleClick = (title) => {
    document.querySelector('.navbar_section').style.background = 'linear-gradient(to bottom, #d70dff 0%, #d70dff 80%, rgba(0, 0, 0, 0) 100%)';
    saveBackcolorFirestore(title);
      
  };

  const handleSignOutClick = () => {
    navigate('/');
    auth.signOut();
    
  }

    const movies = purchasedMovies && purchasedMovies.map((movie, i) => (
        <div key={i} className='purchased-item'>
            <section>
                <p className="purchased-title">Purchased</p>
                <img src={imgUrlStart + movie.poster_path} 
                alt={movie.title} 
                className= 'purchased-img'
                onClick={() => handlePurchasedMovieClick(movie)}
              />
            </section>
        </div>
    ));
    
  return (
    <div className="user-page">
      <section className="navbar_section">
        {/* <img src={Logo} alt="Movie Wheel Logo" className="mov-wheel" onClick={handleMovWheelClick} /> */}
        <img src={movie_wheel} alt="Movie Wheel Logo" className="mov-wheel" onClick={handleMovWheelClick} />
        <details className="dropdown">
          <summary role="button">
            <FiSettings className="settings_icon"/>
          </summary>
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
      <h3><br/>My movies</h3>
      <section className="purchased-container">
        {movies} 
      </section>
      <h3>My watchlist</h3>
      <section className="watchList-container">
        
        <p>{emptyWatchList ? "You haven't added any movies to your watchlist yet" : ""}</p> 
      </section>
    </div>
  )
};

export default UserPage;