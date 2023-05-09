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


const AmexForm = ({setIsPaymentSuccessful,cardName,cardNumber,expDate,cvv,setCVV,setCardNumber,setCardName,setExpDate,saveMovieToFirebase}) => {


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
        const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
        setExpDate(value);
        if (isValid) {
            event.target.setCustomValidity('');
            console.log("Valid Exp date")
            setDateExpValid(true);
        }

        else {
            event.target.setCustomValidity('Please submit a correct exp.Date')
            console.log(" Exp date,is not valid")
        }

    }
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

    const imgUrlStart = "https://image.tmdb.org/t/p/w185";
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

 

    const movie = selectedMovie;
    let navigate = useNavigate();

    const handleExitButtonClick = () => {
        //should we realy use the state to conditional navigate here?
        //cus we should allready had turn the state to false again. 
        if(navigatePayment === true){
            navigate("/")
        }else{
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
        const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
        setExpDate(value);
        if (isValid) {
            event.target.setCustomValidity('');
            console.log("Valid Exp date")
            setDateExpValid(true);
        }

        else {
            event.target.setCustomValidity('Please submit a correct exp.Date')
            console.log(" Exp date,is not valid")
        }

    }

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
        const db = firebase.firestore();
        const user = auth.currentUser;

       
        if(user != null){
            const userUID = auth.currentUser.uid;
 
            db.collection("users").doc(userUID).collection("purchased").doc().set(movie)
            .then(() => {
                console.log("saved.");
            })
            .catch((error) => {
                console.error("error saving: ", error);
            });

        } else {
             
        db.collection("users").doc("demo-user").collection("purchased").doc(movie.title).set({
            title: movie.title,
            img: imgUrlStart + movie.poster_path,
            overview: movie.overview
        })
        .then(() => {
            console.log("saved.");
        })
        .catch((error) => {
            console.error("error saving: ", error);
        });

        }
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
    return (

        <div  className="payment-container">

           
            <button onClick={handleExitButtonClick} className='exit-button'>x</button>
            <div className='div-for-web'>
                <div className='small-info'>


                    {isPaymentSuccessful ? ( <div>
                        
                        <h2>Purchased:</h2><img className='poster' src={imgUrlStart + movie.poster_path}></img> <button /*onClick för att spela film*/  id='playButton'>Play movie</button> </div>) : (<div> <h2>Checkout:</h2><img className='poster' src={imgUrlStart + movie.poster_path}></img> <h2>{movie.title}</h2> </div>)}



                </div>
                {isPaymentSuccessful ? (
                    <div></div>
                ) : (<div className='payment-form-wrapper'>

                    <input type="checkbox" value={"Visa"} name="cardType" checked={cardType === "Visa"} onChange={handleCheckboxChange}></input>


                    <img className={`creditcard ${cardType === "Visa" ? "selected" : ""}`} src={visa} alt="" />


                    <input type="checkbox" value={"Mastercard"} name="cardType" checked={cardType === "Mastercard"} onChange={handleCheckboxChange} ></input>
                    <img className={`creditcard ${cardType === "Mastercard" ? "selected" : ""}`} src={mastercard} alt="" />
                    <input type="checkbox" value={"American Express"} name="cardType" checked={cardType === "American Express"} onChange={handleCheckboxChange}></input>
                    <img className={`creditcard ${cardType === "American Express" ? "selected" : ""}`} src={americanexpress} alt="" />
                    <div>
                    
                    




                    </div>
                    
                    {cardType === "American Express" ? (<AmexForm setIsPaymentSuccessful={setIsPaymentSuccessful} saveMovieToFirebase={saveMovieToFirebase} setCardName={setCardName} setCVV={setCVV} setCardNumber={setCardNumber} setExpDate={setExpDate} cardName={cardName} cardNumber={cardNumber } cvv={cvv} expDate={expDate}/>) : (

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
                            
                            
                            <button type='submit' className='submitButton'> Buy 199kr</button>
                        

                        </form>)}
                       
                </div>
                )}




            </div>




        </div>

    )
}

export default Payment