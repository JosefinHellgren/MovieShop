import './App.css'
import MainPage from './compontents/MainPage';
import MovieInfo from './compontents/MovieInfo';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUpPage from './compontents/SignUpPage';
import LoginPage from './compontents/LoginPage';
import Payment from './compontents/Payment';
import UserPage from './compontents/UserPage';
import Playmovie from './compontents/Playmovie';
import Settings from './compontents/Settings';
import Navbar from './compontents/NavBar.jsx';
import SearchResults from './compontents/SearchResults';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as selectActions } from "./features/selectedmovie"
import { fromPayment } from "./features/navigatePayment";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const navigate = useNavigate();


  const navigatePayment = useSelector((state) => state.navigatePayment.payment);
  const dispatch = useDispatch();
  const [searchPageResults, setSearchPagResults] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const auth = getAuth();

  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        console.log('we have a logged in user')
        //auth.signOut();
      } else {
        setUser(false);
        console.log('No logged in user')
      }
    });
  }, []);

  const handleSearchClick = (newQuery, searchPageResults) => {
    setSearchWord(newQuery);
    setSearchPagResults(searchPageResults);
    navigate('/searchResults');
  }

  const handleMovieClick = (movie) => {
    //setShowSearchDropdown(false);
    //this is what sets the selectedmovie to redux
    console.log('handleMovieclick körs')
    dispatch(selectActions.selectMovie(movie));
    navigate("/movieinfo/");
  };

  /*const handleButtonClick = (movie) => {
    //setShowSearchDropdown(false);
    //this is what sets the selectedmovie to redux

    dispatch(selectActions.selectMovie(movie));

    //if we have a user navigate to Payment:

    if (user) {
      navigate("/payment/");
    }
    else {
      //set state to true
      console.log("the state" + navigatePayment);
      dispatch(fromPayment())
      navigate("/login");
    }

    //if we dont have a user, navigate to login:
  };*/
//handleButtonClick={handleButtonClick}



  return (
    <div className="App">
      <Navbar onSearchClick={handleSearchClick} />
      <Routes>
        <Route path="/" element={<MainPage onCategoryClick={handleSearchClick} handleMovieClick={handleMovieClick} />}/>
        <Route path="/movieinfo" element={<MovieInfo />}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/userpage'element= {<UserPage/>} />
        <Route path= "/signup" element={<SignUpPage/>}/>
        <Route path="/video" element={<Playmovie/>}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path='/settings' element= {<Settings />} />
        <Route path='/searchresults' element= {<SearchResults 
        title={`Showing results for ${searchWord}`} searchResults={searchPageResults} 
        handleMovieClick={handleMovieClick} />} />
      </Routes>
    </div>
  )
}

export default App
