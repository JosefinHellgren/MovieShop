import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './compontents/MainPage';

function App() {

  const apiKey = "305f99214975faee28a0f129881c6ec9";

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MainPage/>
    </div>
  )
}

export default App
