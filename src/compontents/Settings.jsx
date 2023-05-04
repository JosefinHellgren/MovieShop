import './settings.css'
import Logo from "../images/movie_wheel.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Settings = () => {
    const auth = getAuth();
    const db = firebase.firestore();
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(''); 
    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser]= useState(null);
   
    

    onAuthStateChanged(auth, (user) => {
        if (user) {
        setCurrentUser(user);
        } 
      });
  

      useEffect(() => {
        async function fetchData() {
          if (currentUser != null) {
            const docRef = db.collection('users').doc(currentUser.uid);
            
            docRef.get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const email = data.email;
                    const username = data.username;
                    setUserEmail(email);
                    setUsername(username);
                } else {
                  console.log("Dokumentet finns inte!");
                }
              }).catch((error) => {
                console.log("Ett fel uppstod:", error);
              });
              
           
          }
        }
        fetchData();
      }, [currentUser]);

    const signOut = () => {
        auth.signOut()
        .then(() => {
            navigate('/');
        })
    }

    const handleWheelClick = () => {
        navigate('/');
    }
      

    return(
        <div className="settings">
            <header className="navbar-section">
                <img src={Logo} alt="Movie Wheel Logo" className="mov-wheel" onClick={handleWheelClick} />
            </header>
            
            <h1>Settings</h1>

            <section>
                <p><strong>Signed in as:</strong> {username}</p>
                <p><strong>Your email:</strong>{userEmail}</p>

            </section>

            <section>
              <h4>Change color of background</h4>
              <section className='color-container'>
                <p className='black-circle'></p>
                <p className='white-circle'></p>
                <p className='purple-circle'></p>
                <p className='pink-circle'></p>
              </section>
            </section>

            <section>
                <button onClick={signOut}>Sign out</button>
                
            </section>
        </div>
    )
}

export default Settings;