import '../compontents/payment.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import visa from '../assets/Visa.png'
import americanexpress from '../assets/AmericanExpress.png'
import mastercard from '../assets/Mastercard.png'






const AmexForm = (props) => {

    const [cardNumber, setCardNumber] = useState('');
    const [ExpDate, setExpDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardName, setCardName] = useState('');


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
        const isValid = /^[a-zA-Z]+\s?[a-zA-Z]+$/.test(value);
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
            props.setIsPaymentSuccessful(true);
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
                    <input type="text" onChange={handleExpDateChange} value={ExpDate} placeholder='MM/YY'></input>
                    cvv/CVC:
                    <input type="text" onChange={handleCVVChange} value={cvv} placeholder='1234'></input>
                    Name on Card:
                    <input type="text" onChange={handleNameChange} value={cardName} placeholder='Jamile Jonson'></input>
                </div>
                <button className='submitButton' type='submit'> Submit Payment</button>


            </form>
        </div>
    );
};

const Payment = (props) => {
    const imgUrlStart = "https://image.tmdb.org/t/p/w185";
    const [cardNumber, setCardNumber] = useState('');
    const [ExpDate, setExpDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardType, setCardType] = useState('');

    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [nameOnCardValid, setNameOnCardValid] = useState(false);
    const [cvvNumberValid, setCVVNumberValid] = useState(false);
    const [dateExpValid, setDateExpValid] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);


    const movie = props.movie;
    let navigate = useNavigate();

    const handleExitButtonClick = () => {
        navigate("/")
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

            console.log("so its a Amex card and we will need four digits for")

        } else {

            console.log("here we land up if there is not found out to be a Amex card.")
        }
        if (isValid) {
            event.target.setCustomValidity('');
            console.log("correct cvv for visa and mastercard")
            setCVVNumberValid(true);
        } else {
            event.target.setCustomValidity('Please submit a valid cvv/CVC number')
            console.log("its not 3 numbers")
        }
    }

    const handleNameChange = (event) => {
        const { value } = event.target;
        const isValid = /^[a-zA-Z]+\s?[a-zA-Z]+$/.test(value);
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

    const saveToFirebase = () => {
        databaseRef.child('movies').set({
            title: movie.title,
            img: imgUrlStart + movie.poster_path,
            overview: movie.overview,

        });
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        if (cardNumberValid == true && cvvNumberValid == true && nameOnCardValid == true && dateExpValid == true) {
            console.log("all fields area valid")
            setIsPaymentSuccessful(true);
            console.log(cardNumberValid, nameOnCardValid, cvvNumberValid, dateExpValid)
            //save movie information to firebase as "bought"
            //saveToFirebase

        } else {
            console.log("fields are not valid")
            console.log(cardNumberValid, nameOnCardValid, cvvNumberValid, dateExpValid)
        }


    }
    return (

        <div className="payment-container">
            <button onClick={handleExitButtonClick} className='exit-button'>x</button>
            {isPaymentSuccessful ? (<h2>Purchased:</h2>) : (
                <h2>Checkout:</h2>)
            }
            <div className='small-info'>
                <img className='poster' src={imgUrlStart + movie.poster_path}></img>
                {isPaymentSuccessful ? (<div></div>) : (<p>{movie.title}</p>)}



            </div>
            {isPaymentSuccessful ? (<div>You have purchased the movie and can now watch it
                <button id='playButton'>Play movie</button>
            </div>) : (<div className='payment-form-wrapper'>
                <h3>199kr</h3>
                <input type="checkbox" value={"Visa"} name="cardType" checked={cardType === "Visa"} onChange={handleCheckboxChange}></input>
                
                
                <img className={`creditcard ${cardType === "Visa" ? "selected" : ""}`} src={visa} alt="" />
                
                
                <input type="checkbox" value={"Mastercard"} name="cardType" checked={cardType === "Mastercard"} onChange={handleCheckboxChange} ></input>
                <img className={`creditcard ${cardType === "Mastercard" ? "selected" : ""}`}src={mastercard} alt="" />
                <input type="checkbox" value={"American Express"} name="cardType" checked={cardType === "American Express"} onChange={handleCheckboxChange}></input>
                <img className={`creditcard ${cardType === "American Express" ? "selected" : ""}`} src={americanexpress} alt="" />

                {cardType === "American Express" ? (<AmexForm setIsPaymentSuccessful={setIsPaymentSuccessful} />) : (

                    <form onSubmit={handleSubmit}>
                        <div className='paymentform'>

                            Card Number:

                            <input type="text" onChange={handleCardNumberChange} value={cardNumber} placeholder='Valid Card Number'></input>
                            Exp. Date:
                            <input type="text" onChange={handleExpDateChange} value={ExpDate} placeholder='MM/YY'></input>
                            cvv/CVC:
                            <input type="text" onChange={handleCVVChange} value={cvv} placeholder='123'></input>
                            Name on Card:
                            <input type="text" onChange={handleNameChange} value={cardName} placeholder='Jamile Jonson'></input>
                        </div>
                        <button type='submit' className='submitButton'> Submit Payment</button>
                    </form>)}

            </div>)}









        </div>

    )
}

export default Payment