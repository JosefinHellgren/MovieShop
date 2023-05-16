import './signuppage.css'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUpPage = ({onCreatingAccountClick}) => {

    const auth = getAuth();
    const db = firebase.firestore();
    const navigate = useNavigate();

    const STATUS_USERNAME = {
        NORMAL: ' _',
        VALID: 'Username is available',
        EXISTS: 'The username is already taken',
        INVALID: 'Username must not contain spaces'
    }
    const [validUsername, setValidUsername] = useState(STATUS_USERNAME.NORMAL);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);


    const handleEmailChange = (event) => {
        const { value } = event.target;

        const isValid = validateEmail(value);

        if (isValid) {
            event.target.setCustomValidity('');
            setValidEmail(true);
        } else {
            event.target.setCustomValidity('Please enter a valid email address with a valid domain');
            setValidEmail(false);
        }
    }

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)

        if (isValid) {
            event.target.setCustomValidity('');
            setValidPassword(true);
        } else {
            event.target.setCustomValidity('The password should be a minimum of 8 characters long and include at least one uppercase letter and one number');
        }
    }

    const checkIfUsernameExists = () => {
        const username = document.getElementById('username-input').value;

        if (username === '') {
            setValidUsername(STATUS_USERNAME.NORMAL);
        } else if (checkSpaces(username)) {
            setValidUsername(STATUS_USERNAME.INVALID);
        } else {
            const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);

            db.collection('users').where('username', "==", formattedUsername).get()
                .then((doc) => {
                    if (!doc.empty) {
                        setValidUsername(STATUS_USERNAME.EXISTS);
                    } else {
                        setValidUsername(STATUS_USERNAME.VALID);
                    }
                })
        }
    }

    const checkSpaces = (str) => {
        const regex = /\s/;
        return regex.test(str);
    }

    const validateEmail = (email) => {

        const isEmpty = /^\s*$/.test(email);
        if (isEmpty) {
            return false;
        } 

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domain = email.substring(email.lastIndexOf("@") + 1);
        if (re.test(email) && domain === "gmail.com") {
            return true;
        } else if (re.test(email) && domain === "hotmail.com") {
            return true
        } else if (re.test(email) && domain === "outlook.com") {
            return true
        } else if (re.test(email) && domain === "yahoo.com") {
            return true
        } else if (re.test(email) && domain === "live.com") {
            return true
        } else {
            return false;
        }
    }

    const signUp = () => {
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        const repeatPassword = document.getElementById('repeatpassword-input').value;


        if (validUsername == STATUS_USERNAME.INVALID) {
            alert('Username must not contain spaces');
        } else if (validUsername == STATUS_USERNAME.EXISTS) {
            alert('The username is already taken, please enter a new username');
        } else if (password != repeatPassword) {
            alert('The passwords you entered are not identical. Please try again');
        } else {
            onCreatingAccountClick('creating');
            createAccount(email, password);
        }
    }

    const createAccount = (email, password) => {
        const userName = document.getElementById('username-input').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentail) => {
                console.log(userCredentail.user.uid, 'lyckats skapa konto!')
                saveDataToFirestore(userName, email);
            })
            .catch((error) => {
                const errorCode = error.code
                if (errorCode === 'auth/email-already-in-use') {
                    alert('Email is already in use. Please enter a different email.');
                }
                return;
            })
    }

    const saveDataToFirestore = (username, email) => {
        const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        const userUID = auth.currentUser.uid;

        db.collection("users").doc(userUID).set({
            username: formattedUsername,
            email: email,
            background: 'black'
        })
            .then(() => {
                onCreatingAccountClick('success')
                console.log("Document successfully written!");
                navigate(-2);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    const handleIconClick = () => {
        navigate(-1);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        signUp();
    }

    return (
        <div className="sign-up-page">
            <div className='fa-icon-container' onClick={handleIconClick}>
                <FontAwesomeIcon className='fa-times-icon' icon={faTimes} />
            </div>
            <section className='signup-title'>
                <h1>Create an account</h1>
            </section>
            <form onSubmit={handleSubmit} className="sign-up-container">
                <p className={validUsername === STATUS_USERNAME.EXISTS ? 'text-danger' :
                    validUsername === STATUS_USERNAME.VALID ? 'text-success' :
                        validUsername === STATUS_USERNAME.INVALID ? 'text-danger' : ''

                }>{validUsername}</p>
                <input type="text" id='username-input' placeholder="Username" onChange={checkIfUsernameExists} required />
                <input type="text" id='email-input' placeholder="Email" onChange={handleEmailChange} required />
                <input type="password" id='password-input' placeholder="Password" onChange={handlePasswordChange} required />
                <input type="password" id='repeatpassword-input' placeholder="Repeat Password" required />
                <section className='signup-button-container'>
                    <button type='submit' >Sign up</button>
                </section>
            </form>

        </div>
    )
}

export default SignUpPage;