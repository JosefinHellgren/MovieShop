import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './compontents/MainPage';
import MovieInfo from './compontents/MovieInfo';
import { Route, Routes } from 'react-router-dom';

import SignUpPage from './compontents/SignUpPage';
import LoginPage from './compontents/LoginPage';
import Payment from './compontents/Payment';
import UserPage from './compontents/UserPage';


function App() {

  const apiKey = "305f99214975faee28a0f129881c6ec9";

  const [movie, setMovie] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage setMovie={setMovie}/>}/>
        <Route path="/movieinfo" element={<MovieInfo movie={movie}/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/userpage'element= {<UserPage/>} />
        <Route path= "/signup" element={<SignUpPage/>}/>
        <Route path="/payment" element={<Payment movie={movie}/>}/>
      </Routes>
    </div>
  )
}

export default App
