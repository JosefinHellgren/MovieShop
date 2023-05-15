import './App.css'
import MainPage from './compontents/MainPage';
import MovieInfo from './compontents/MovieInfo';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUpPage from './compontents/SignUpPage';
import LoginPage from './compontents/LoginPage';
import Payment from './compontents/Payment';
import UserPage from './compontents/UserPage';
import Playmovie from './compontents/Playmovie';
import Navbar from './compontents/NavBar.jsx';
import SearchResults from './compontents/SearchResults';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as selectActions } from "./features/selectedmovie"
import { fromPayment } from "./features/navigatePayment";



function App() {
  const navigate = useNavigate();


  const navigatePayment = useSelector((state) => state.navigatePayment.payment);
  const dispatch = useDispatch();
  const [searchPageResults, setSearchPagResults] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const CREATEACCOUNT_STATUS = {
    NORMAL : 'normal',
    CREATING: 'creating',
    SUCCESS: 'success'
  }

  const [createAccount, setCreateAccount] = useState(CREATEACCOUNT_STATUS.NORMAL);
 
  const handleSearchClick = (newQuery, searchPageResults) => {
    setSearchWord(newQuery);
    setSearchPagResults(searchPageResults);
    navigate('/searchResults');
  }

  const handleCreateAccountStatus = (NEW_STATUS) => {
    console.log('handleCreateAccountStatus körs, datan:', NEW_STATUS);
    setCreateAccount(NEW_STATUS);
  }

  const handleMovieClick = (movie) => {
    dispatch(selectActions.selectMovie(movie));
    navigate("/movieinfo/");
  };

  const handleButtonClick = (movie) => {
    dispatch(selectActions.selectMovie(movie));

    if (user) {
      navigate("/payment/");
    } else {
      dispatch(fromPayment())
      navigate("/login");
    }
  };

  return (
    <div className="App">
      <Navbar onSearchClick={handleSearchClick} handleAccountStatus = {handleCreateAccountStatus} createAccount = {createAccount}/>
      <Routes>
        <Route path="/" element={<MainPage onCategoryClick={handleSearchClick} handleMovieClick={handleMovieClick} handleButtonClick={handleButtonClick}/>}/>
        <Route path="/movieinfo" element={<MovieInfo />}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/userpage'element= {<UserPage/>} />
        <Route path= "/signup" element={<SignUpPage onCreatingAccountClick = {handleCreateAccountStatus}/>}/>
        <Route path="/video" element={<Playmovie/>}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path='/searchresults' element= {<SearchResults 
        title={`Showing results for ${searchWord}`} searchResults={searchPageResults} 
        handleMovieClick={handleMovieClick} handleButtonClick={handleButtonClick}/>} />
      </Routes>
    </div>
  )
}

export default App
