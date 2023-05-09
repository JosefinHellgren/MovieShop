import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './userpage.css'

const UserPage = ({handleMovieClick}) => {

    const [purchasedMovies, setPurchasedMovies] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [emptyWatchList, setEmptyWatchList] = useState(true);

    const db = firebase.firestore();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
         setCurrentUser(user);
        } 
      });
    
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
    

    const movies = purchasedMovies && purchasedMovies.map((movie, i) => (
        <div key={i} className='purchased-item'>
            <section>
                <p className="purchased-title">Purchased</p>
                <img src={imgUrlStart + movie.poster_path} 
                alt={movie.title} 
                className= 'purchased-img' 
              />
            </section>
        </div>
    ));

    return (
        <div className="user-page">
            <h3>My movies</h3>
            <section className="purchased-container">
               {movies} 
            </section>
            <h3>My watchlist</h3>
            <section className="watchList-container">
              
               <p>You haven't added any movies to your watchlist yet</p> 
            </section>
        </div>
    )
}

export default UserPage;