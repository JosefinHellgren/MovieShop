
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



function App() {


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/movieinfo" element={<MovieInfo />}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/userpage'element= {<UserPage/>} />
        <Route path= "/signup" element={<SignUpPage/>}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path='/settings' element= {<Settings />} />
      </Routes>
    </div>
  )
}

export default App
