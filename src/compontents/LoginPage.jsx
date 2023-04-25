import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './loginpage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PasswordInput from './PasswordInput';

const LoginPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)
        } else {
          console.log('user is signed out')
        }
      });

    

    const login = async () => {
        const email = document.getElementById('userEmail-input').value;
        const password = document.getElementById('userPassword-input').value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password )
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log(user.uid);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const handleIconClick = ()  => {
        navigate(-1);
    }

    const handleRegisterClick = () => {
        navigate("/signup/");
    }

    return (
        <div className='login-page'>
             <div className='fa-icon-container' onClick={handleIconClick}>
                <FontAwesomeIcon className='fa-times-icon' icon={faTimes}/>
            </div>

           
            <section className='signup-title'>
                <h1>Welcome back!</h1>
            </section>
            <section className="sign-up-container">
                <input type="text" id='userEmail-input' placeholder="Enter you email" />
                <PasswordInput
                id="userPassword-input"
                className = "password-input"
                name="password"
                placeholder="Enter your password"
      />
                
            </section>
      
            
            <p className='register-member' onClick={handleRegisterClick}>Not registered yet? Register here!</p>
            
            <section className='signup-button-container'>
                <button onClick={login}>Sign in</button>
             </section> 
        </div>
    );
}

export default LoginPage;