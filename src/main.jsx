import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { HashRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './features/rootreducer.js';
import { Provider } from 'react-redux';
import FakeSwish from './compontents/FakeSwish';



const firebaseConfig = {
  apiKey: "AIzaSyDEfI0TLpFbsldRzHb72ZhZsXVKjiuRn1o",
  authDomain: "movieshop-e53aa.firebaseapp.com",
  projectId: "movieshop-e53aa",
  storageBucket: "movieshop-e53aa.appspot.com",
  messagingSenderId: "711049264258",
  appId: "1:711049264258:web:2e6a5ce723a1873b7a089b"
};



firebase.initializeApp(firebaseConfig);

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)


