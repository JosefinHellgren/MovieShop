import './signuppage.css'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';

const SignUpPage = () => {
    

    const auth = getAuth();

    const validateEmail = (email) => {
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

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    }

    
    const signUp = () => {
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        const repeatPassword = document.getElementById('repeatpassword-input').value;

        if (email === '') {
            alert('Please enter your email address');
        } else if (password === '') {
            alert('Please enter your password');
        } else if (repeatPassword === '') {
            alert('Please confirm your password');
        } else if (password != repeatPassword) {
            alert('The passwords you entered are not identical. Please try again');
        } else if (!validateEmail(email)) {
            alert("Please enter a valid email address with a valid domain");
        } else if (!validatePassword(password)) {
            alert('Password must contain at least one number and be at least 8 characters long');
        }  else {
            createAccount(email, password);
        }
    }

    const createAccount = (email, password) => {
        const userName = document.getElementById('username-input').value;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            console.log(userCredentail.user.email, 'lyckats logga in!')
            saveDataToFirestore(userName, email);
        })
        .catch((error) => {
            console.log(error)
            return;
        })
    }

    const saveDataToFirestore = (username, email) => {
        const db = firebase.firestore();
        const userUID = auth.currentUser.uid;
        
        db.collection("users").doc(userUID).set({
            username: username,
            email: email,
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    const FaTimesIcon = () => {
        return (
          <IconContext.Provider
            value={{ color: 'white', size: '35px' }}
          >
            <div className='fa-icon-container'>
              <FaTimes />
            </div>
          </IconContext.Provider>
        );
      }


    return (
        <div className="sign-up-page">
            <FaTimesIcon />  
            <section className='signup-title'>
                <h1>Create an account</h1>
            </section>
            <section className="sign-up-container">
                <input type="text" id='username-input' placeholder="username" />
                <input type="text" id='email-input' placeholder="email" />
                <input type="password" id='password-input' placeholder="password" />
                <input type="password" id='repeatpassword-input' placeholder="repeat password" />
            </section>
            <section className='signup-button-container'>
                <button onClick={signUp}>Sign up</button>
             </section>
        </div>
    )
}

export default SignUpPage;