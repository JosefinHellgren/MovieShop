import '../compontents/payment.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import visa from '../images/visa.png'
import americanexpress from '../images/AmericanExpress.png'
import mastercard from '../images/Mastercard.png'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getAuth } from "firebase/auth"
import { useSelector } from 'react-redux';
import PaymentSucsessfull from './PaymentSucsessfull';


const AmexForm = ({ setIsPaymentSuccessful, cardName, cardNumber, expDate, cvv, setCVV, setCardNumber, setCardName, setExpDate, saveMovieToFirebase }) => {


    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [nameOnCardValid, setNameOnCardValid] = useState(false);
    const [cvvNumberValid, setCVVNumberValid] = useState(false);
    const [dateExpValid, setDateExpValid] = useState(false);


    const handleCardNumberChange = (event) => {
        const { value } = event.target;

        const isValid = /^\d{15}$/.test(value);
        setCardNumber(value)


        if (isValid) {
            event.target.setCustomValidity('');
            setCardNumberValid(true);


            console.log("its valid")
        } else {
            event.target.setCustomValidity('Please enter a valid 15-digit card number');
            console.log("its not  valid")
        }
        console.log(value)

    }
    const handleExpDateChange = (event) => {
        const { value } = event.target;
        const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
        const currentDate = new Date();
        const [month, year] = value.split('/');
        const cardExpiration = new Date(Number("20" + year), Number(month) - 1, 1); // Assuming the year is in the format YY, we add "20" to convert it to YYYY
      
        setExpDate(value);
      
        if (isValid) {
          
      
          if (cardExpiration < currentDate) {
            event.target.setCustomValidity('Card has expired');
            console.log('Card has expired');
            // Handle the expired card scenario here
          } else {
            console.log('Card is still valid');
            setDateExpValid(true);
            event.target.setCustomValidity('');
            // Handle the valid card scenario here
          }
        } else {
          event.target.setCustomValidity('Please submit a correct expiration date');
          console.log('Invalid expiration date');
          // Handle the invalid expiration date scenario here
        }
      };
      
    const handleCVVChange = (event) => {
        const { value } = event.target;

        setCVV(value)
        const isValid = /^\d{4}$/.test(value);


        if (isValid) {
            event.target.setCustomValidity('');
            console.log("correct cvv for visa and mastercard")
            setCVVNumberValid(true);
        } else {
            event.target.setCustomValidity('Please submit a valid cvv/CVC number')
            console.log("its not 4 digits")
        }
    }

    const handleNameChange = (event) => {
        const { value } = event.target;



        const isValid = /^[a-zA-Z\u00C0-\u00ff]+\s?[a-zA-Z\u00C0-\u00ff]+$/.test(value)

        setCardName(value);

        if (isValid) {
            event.target.setCustomValidity('');
            setNameOnCardValid(true);
        } else {
            event.target.setCustomValidity('Please use only letters')

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (cardNumberValid == true && cvvNumberValid == true && nameOnCardValid == true && dateExpValid == true) {
            console.log("you now bought the movie")
            setIsPaymentSuccessful(true);
            saveMovieToFirebase();
            console.log(cardNumberValid, nameOnCardValid, cvvNumberValid, dateExpValid)

        } else {

            console.log(cardNumberValid, nameOnCardValid, cvvNumberValid, dateExpValid)
        }


    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='paymentform'>
                    Card Number:
                    <input type="text" onChange={handleCardNumberChange} value={cardNumber} placeholder='Valid Card Number'></input>
                    Exp. Date:
                    <input type="text" onChange={handleExpDateChange} value={expDate} placeholder='MM/YY'></input>
                    cvv/CVC:
                    <input type="text" onChange={handleCVVChange} value={cvv} placeholder='1234'></input>
                    Name on Card:
                    <input type="text" onChange={handleNameChange} value={cardName} placeholder='Jamile Jonson'></input>
                </div>
                <button className='submitButton' type='submit'> Buy 199kr</button>
            </form>
        </div>
    );
};

const Payment = () => {


    //CILIA REDUX SELECTEDMOVIE
    //how to get the selectedmovie from redux, must also import useSelector from react-redux
    const selectedMovie = useSelector(state => state.selectedMovie.selectedMovie);
    // use the selectedMovie like this
    console.log("payment: " + selectedMovie.title);

    const imgUrlStart = "https://image.tmdb.org/t/p/original";
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardType, setCardType] = useState('');

    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [nameOnCardValid, setNameOnCardValid] = useState(false);
    const [cvvNumberValid, setCVVNumberValid] = useState(false);
    const [dateExpValid, setDateExpValid] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const navigatePayment = useSelector((state) => state.navigatePayment.payment);

    const auth = getAuth();
    const db = firebase.firestore();
    const movie = selectedMovie;
    let navigate = useNavigate();

    const handleExitButtonClick = () => {
        //should we realy use the state to conditional navigate here?
        //cus we should allready had turn the state to false again. 
        if (navigatePayment === true) {
            navigate('/')
        } else {
            navigate(-1)
        }
    }

    const handleCheckboxChange = (event) => {

        const { value } = event.target;
        setCardType(value)
        console.log(value)
    }

    const handleCardNumberChange = (event) => {
        const { value } = event.target;

        const isValid = /^\d{16}$/.test(value);
        setCardNumber(value)


        if (isValid) {
            event.target.setCustomValidity('');
            setCardNumberValid(true);


            console.log("its valid")
        } else {
            event.target.setCustomValidity('Please enter a valid 16-digit card number');
            console.log("its not  valid")
        }
        console.log(value)

    }


    const handleExpDateChange = (event) => {
        const { value } = event.target;
        const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
        const currentDate = new Date();
        const [month, year] = value.split('/');
        const cardExpiration = new Date(Number("20" + year), Number(month) - 1, 1); // Assuming the year is in the format YY, we add "20" to convert it to YYYY
      
        setExpDate(value);
      
        if (isValid) {
          
      
          if (cardExpiration < currentDate) {
            event.target.setCustomValidity('Card has expired');
            console.log('Card has expired');
            // Handle the expired card scenario here
          } else {
            console.log('Card is still valid');
            setDateExpValid(true);
            event.target.setCustomValidity('');
            // Handle the valid card scenario here
          }
        } else {
          event.target.setCustomValidity('Please submit a correct expiration date');
          console.log('Invalid expiration date');
          // Handle the invalid expiration date scenario here
        }
      };
      
      
      
      
      
      
      
      


  

    const handleCVVChange = (event) => {
        const { value } = event.target;

        setCVV(value)
        const isValid = /^\d{3}$/.test(value);

        if (cardType == "American Express") {



        } else {

            console.log("here we land up if there is not found out to be a Amex card.")
        }
        if (isValid) {
            event.target.setCustomValidity('');
            console.log("correct cvv for amex")
            setCVVNumberValid(true);
        } else {
            event.target.setCustomValidity('Please submit a valid 4 digit cvv/CVC number')
            console.log("its not 4 numbers")
        }
    }

    const handleNameChange = (event) => {
        const { value } = event.target;

        const isValid = /^[a-zA-Z\u00C0-\u00ff]+\s?[a-zA-Z\u00C0-\u00ff]+$/.test(value)


        setCardName(value);

        if (isValid) {
            console.log("its a string without numbers or symbols")
            event.target.setCustomValidity('');
            setNameOnCardValid(true);
        } else {
            event.target.setCustomValidity('Please use only letters')
            console.log("please use only letters")
        }
    }



    const saveMovieToFirebase = () => {

        const user = auth.currentUser;

        if (user != null) {
            const userUID = auth.currentUser.uid;

            db.collection("users").doc(userUID).collection("purchased").doc().set(movie)
                .then(() => {
                    console.log("saved.");
                    deleteWatchlistMovieIfFound();
                })
                .catch((error) => {
                    console.error("error saving: ", error);
                });
        }
    }

    const deleteWatchlistMovieIfFound = () => {

        const user = auth.currentUser;

        console.log('selectedMovie Id', selectedMovie.id);
        console.log('user Id', user.uid);
        db.collection('users').doc(user.uid).collection('watchlist')
            .where('id', '==', selectedMovie.id).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const documentId = doc.id;
                        deleteMovieFromWatchlist(user, documentId);
                    });
                }
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    };

    const deleteMovieFromWatchlist = (user, documentId) => {
        db.collection("users").doc(user.uid).collection('watchlist').doc(documentId).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }



    const handleSubmit = (event) => {
        event.preventDefault()
        if (cardNumberValid == true && cvvNumberValid == true && nameOnCardValid == true && dateExpValid == true) {
            console.log("all fields area valid")
            setIsPaymentSuccessful(true);
            console.log(cardNumberValid, nameOnCardValid, cvvNumberValid, dateExpValid)

            saveMovieToFirebase()


        } else {
            console.log("fields are not valid")
            console.log(cardNumber, cardName, cvv, expDate)
        }


    }

//If we want to use the background image.
    const componentStyle = {
        backgroundImage: `url(${imgUrlStart+movie.backdrop_path})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1.0)'
        
      };
    return (


        <div className="payment-container"  >
         
            <div className={isPaymentSuccessful ? 'div-for-web show' : 'div-for-web'}>
                <div className='small-info'>

                    
                    {isPaymentSuccessful ? (<div className='loading_payment'>

                        <img className='poster_purchased' src={imgUrlStart + movie.poster_path}></img> <br/><PaymentSucsessfull/> </div>) : (<div>  <h1 onClick={handleExitButtonClick} className='exit-button'>x</h1> <h2>Checkout:</h2><img className='poster' src={imgUrlStart + movie.poster_path}></img> <h2>{movie.title}</h2> </div>)}

                </div>
                {isPaymentSuccessful ? (
                    <></>
                ) : (<div className='payment-form-wrapper'>
                    <input type="checkbox" value={"Visa"} name="cardType" checked={cardType === "Visa"} onChange={handleCheckboxChange}></input>
                    <img className={`creditcard ${cardType === "Visa" ? "selected" : ""}`} src={visa} alt="" />
                    <input type="checkbox" value={"Mastercard"} name="cardType" checked={cardType === "Mastercard"} onChange={handleCheckboxChange} ></input>
                    <img className={`creditcard ${cardType === "Mastercard" ? "selected" : ""}`} src={mastercard} alt="" />
                    <input type="checkbox" value={"American Express"} name="cardType" checked={cardType === "American Express"} onChange={handleCheckboxChange}></input>
                    <img className={`creditcard ${cardType === "American Express" ? "selected" : ""}`} src={americanexpress} alt="" />
                

                    {cardType === "American Express" ? (<AmexForm setIsPaymentSuccessful={setIsPaymentSuccessful} saveMovieToFirebase={saveMovieToFirebase} setCardName={setCardName} setCVV={setCVV} setCardNumber={setCardNumber} setExpDate={setExpDate} cardName={cardName} cardNumber={cardNumber} cvv={cvv} expDate={expDate} />) : (

                        <form onSubmit={handleSubmit}>
                            <div className='paymentform'>
                                Card Number:
                                <input type="text" onChange={handleCardNumberChange} value={cardNumber} placeholder='Valid Card Number'></input>
                                Exp. Date:
                                <input type="text" onChange={handleExpDateChange} value={expDate} placeholder='MM/YY'></input>
                                cvv/CVC:
                                <input type="text" onChange={handleCVVChange} value={cvv} placeholder='123'></input>
                                Name on Card:
                                <input type="text" onChange={handleNameChange} value={cardName} placeholder='Jamile Jonson'></input>
                            </div>
                            <button type='submit' className='submitButton'> Buy </button>
                            <button onClick={handleExitButtonClick}>Cancel</button>
                        </form>)}
                </div>
                )}
            </div>
        </div>

    )
}

export default Payment