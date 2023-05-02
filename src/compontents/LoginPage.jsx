import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './loginpage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PasswordInput from './PasswordInput';
import { useState } from 'react';

const LoginPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const ERROR  = {
      EMAILMISSING : 'Please enter your email',
      PASSWORDMISSING : 'Please enter your password',
      INVALIDEMAIL : 'Invalid email',
      WRONGPASSWORD : 'Wrong password',
      USERNOTFOUND : 'User not found'
    }

    const login = async () => {
        const email = document.getElementById('userEmail-input').value;
        const password = document.getElementById('userPassword-input').value;

        if (email === '') {
          setErrorMessage(ERROR.EMAILMISSING);
          setErrorEmail(true);
        } else if (password === '') {
          setErrorMessage(ERROR.PASSWORDMISSING);
          setErrorPassword(true);
        } else {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password )
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log(user.uid);
            navigate(-1)
          })
          .catch((error) => {
            if(error.code === 'auth/wrong-password') {
              setErrorMessage(ERROR.WRONGPASSWORD);
              setErrorPassword(true);
            } else if (error.code === 'auth/invalid-email') {
              setErrorMessage(ERROR.INVALIDEMAIL);
              setErrorEmail(true);
            } else if (error.code === 'auth/user-not-found') {
              setErrorMessage(ERROR.USERNOTFOUND);
            }
          });
        }
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
                <h1>Sign in</h1>
            </section>
            <section className="sign-up-container">

              <p className='error-message'>{errorMessage}</p>
                <input type="text" className={errorEmail ? "email-input red-border" : "email-input"} id='userEmail-input' placeholder="Enter you email" />
                <PasswordInput
                id="userPassword-input"
                className = { errorPassword ? "password-input red-border" : "password-input" }
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