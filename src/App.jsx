
import './App.css'
import MainPage from './compontents/MainPage';
import MovieInfo from './compontents/MovieInfo';
import { Route, Routes, useNavigate } from 'react-router-dom';

import SignUpPage from './compontents/SignUpPage';
import LoginPage from './compontents/LoginPage';
import Payment from './compontents/Payment';
import UserPage from './compontents/UserPage';
import Settings from './compontents/Settings';
import Navbar from './compontents/NavBar.jsx';
import SearchResults from './compontents/SearchResults';
import { useState } from 'react';
import { useDispatch } from 'react-redux';



function App() {


  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [searchPageResults, setSearchPagResults] = useState([]);

  const [searchWord, setSearchWord] = useState('');

  const handleSearchClick = (newQuery, searchPageResults) => {
    setSearchWord(newQuery);
    setSearchPagResults(searchPageResults);
    navigate('/searchResults');
  }

  const handleMovieClick = (movie) => {

    //this is what sets the selectedmovie to redux
    console.log('handleMovieclick körs')
    dispatch(selectActions.selectMovie(movie));
    setShowSearchDropdown(false)
    navigate("/movieinfo/");
  };

  const handleButtonClick = (movie) => {
   //this is what sets the selectedmovie to redux
   console.log('handleButtonclick körs')
    dispatch(selectActions.selectMovie(movie));
    navigate('/movieinfo')
  };

  return (
    <div className="App">
      <Navbar onSearchClick={handleSearchClick}/>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/movieinfo" element={<MovieInfo />}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/userpage'element= {<UserPage/>} />
        <Route path= "/signup" element={<SignUpPage/>}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path='/settings' element= {<Settings />} />

        <Route path='/searchresults' element= {<SearchResults 
        query={searchWord} searchResults={searchPageResults} 
        handleMovieClick={handleMovieClick} handleButtonClick={handleButtonClick}/>} />
      </Routes>
    </div>
  )
}

export default App
