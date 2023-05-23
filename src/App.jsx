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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as searchDropDownActions } from "./features/searchdropdown"

function App() {

  const navigate = useNavigate();
  const [isUserIconVisible, setIsUserIconVisible] = useState(true); 
  const navigatePayment = useSelector((state) => state.navigatePayment.payment);
  const dispatch = useDispatch();
  const [searchPageResults, setSearchPagResults] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [category, setCategory] = useState('');

  const CREATEACCOUNT_STATUS = {
    NORMAL: 'normal',
    CREATING: 'creating',
    SUCCESS: 'success'
  }

  const [createAccount, setCreateAccount] = useState(CREATEACCOUNT_STATUS.NORMAL);


  const handleSearchClick = (newQuery, searchPageResults, category) => {
    setCategory(category);
    setSearchWord(newQuery);
    setSearchPagResults(searchPageResults);
    navigate('/searchResults');
  }

  const handleIsShowingUserIcon = (isVisible) => {
    if (isVisible != isUserIconVisible) {
      console.log('inom if sats')
      setIsUserIconVisible(isVisible);
    }
  }

  const handleCreateAccountStatus = (NEW_STATUS) => {
    console.log('handleCreateAccountStatus körs, datan:', NEW_STATUS);
    setCreateAccount(NEW_STATUS);
  }

  const handleMovieClick = (movie) => {
    localStorage.setItem('lastSelectedMovie', JSON.stringify(movie))
    navigate("/movieinfo/");
  };

  const handleCloseSearchbar = () => {
    dispatch(searchDropDownActions.hideSearchDropDown());
  }

  return (

    <div className="App">
      <Navbar onSearchClick={handleSearchClick} handleAccountStatus = {handleCreateAccountStatus} createAccount = {createAccount} isUserIconVisible ={isUserIconVisible}/>
      <Routes>

        <Route path="/" element={<MainPage onCategoryClick={handleSearchClick} handleMovieClick={handleMovieClick} toggleUserIconVisibility = {handleIsShowingUserIcon}/>}/>
        <Route path="/movieinfo" element={<MovieInfo onCategoryClick={handleSearchClick} handleMovieClick={handleMovieClick} toggleUserIconVisibility={handleIsShowingUserIcon}/>}/>
        <Route path='/login' element={<LoginPage toggleUserIconVisibility={handleIsShowingUserIcon}/>} />
        <Route path='/userpage'element= {<UserPage toggleUserIconVisibility={handleIsShowingUserIcon} />} />
        <Route path= "/signup" element={<SignUpPage 
        onCreatingAccountClick = {() => handleCreateAccountStatus} 
        toggleUserIconVisibility={handleIsShowingUserIcon}/>}/>
        <Route path="/video" element={<Playmovie toggleUserIconVisibility={handleIsShowingUserIcon}/>}/>
        <Route path="/payment" element={<Payment toggleUserIconVisibility={handleIsShowingUserIcon}/>}/>
        <Route path='/searchresults' element= {<SearchResults 
        title={`Showing results for ${searchWord}`} searchResults={searchPageResults} 
        handleMovieClick={handleMovieClick} 
        toggleUserIconVisibility={handleIsShowingUserIcon}/>} />

      </Routes>
    </div>
  )
}

export default App
