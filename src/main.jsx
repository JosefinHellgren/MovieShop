import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeApp } from "firebase/app";
import { HashRouter as Router } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDEfI0TLpFbsldRzHb72ZhZsXVKjiuRn1o",
  authDomain: "movieshop-e53aa.firebaseapp.com",
  projectId: "movieshop-e53aa",
  storageBucket: "movieshop-e53aa.appspot.com",
  messagingSenderId: "711049264258",
  appId: "1:711049264258:web:2e6a5ce723a1873b7a089b"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
