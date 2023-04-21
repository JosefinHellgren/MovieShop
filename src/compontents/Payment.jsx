import '../compontents/payment.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';








const Payment = (props) =>{
    const imgUrlStart = "https://image.tmdb.org/t/p/w185";
    const [cardNumber,setCardNumber] = useState('');
    const [ExpDate,setExpDate] = useState('');
    const [CVV,setCVV] = useState('');
    const [cardName,setCardName] = useState('');

const [cardNumberValid,setCardNumberValid] = useState(false);
const [nameOnCard, setNameOnCard] = useState(false);
const [CVVNumber, setCVVNumber] = useState(false);
const [dateExp, setDateExp] = useState(false);
const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    
    const movie = props.movie;
    let navigate = useNavigate();

const handleButtonClick = ()=>{
navigate("/")
}

const handleCardNumberChange = (event)=>{
    const {value} = event.target;
    
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

const handleExpDateChange = (event) =>{
const {value} = event.target;
const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
setExpDate(value);
if(isValid){
    event.target.setCustomValidity('');
    console.log("Valid Exp date")
    setDateExp(true);}
   
else{
    event.target.setCustomValidity('Please submit a correct exp.Date')
console.log(" Exp date,is not valid")
}

}

const handleCVVChange = (event) =>{
    const {value} = event.target;
const isValid = /^\d{3}$/.test(value);
setCVV(value)
if(isValid){
    event.target.setCustomValidity('');
    console.log("correct cvv for visa and mastercard")
    setCVVNumber(true);
}else{
    event.target.setCustomValidity('Please submit a valid CVV/CVC number')
    console.log("its not 3 numbers")
}
}

const handleNameChange = (event) =>{
    const {value} = event.target;
    const isValid = /^[a-zA-Z]+\s?[a-zA-Z]+$/.test(value);
    setCardName(value);

    if(isValid){
        console.log("its a string without numbers or symbols")
        event.target.setCustomValidity('');
        setNameOnCard(true);
    }else{
        event.target.setCustomValidity('Please use only letters')
        console.log("please use only letters")
    }
}

const saveToFirebase = () =>{
    databaseRef.child('movies').set({
        title: movie.title,
        img: imgUrlStart+movie.poster_path,
        overview: movie.overview ,
        
      });
}


const handleSubmit = (event) => {
    event.preventDefault()

   if(cardNumberValid == true && CVVNumber == true && nameOnCard == true && dateExp == true){
    console.log("you now bought the movie")
    setIsPaymentSuccessful(true);
    console.log(cardNumberValid,nameOnCard,CVVNumber,dateExp)
    //save movie information to firebase as "bought"
    
   }else{
    console.log("not correctly filled")
    console.log(cardNumberValid,nameOnCard,CVVNumber,dateExp)
   }

  
  }
    return(

        <div className="payment-container">
            <button onClick={handleButtonClick} className='exit-button'>x</button>
            {isPaymentSuccessful ? (<h2>Purchased:</h2>) : (
         <h2>Checkout:</h2>)
            }
         <div className='small-info'>
         <img src={imgUrlStart+movie.poster_path}></img> 
{isPaymentSuccessful ? (<div></div>) : ( <p>{movie.title}{movie.overview}</p>)}

         

         </div>
         {isPaymentSuccessful ? ( <div>You have purchased the movie and can now watch it
                <button id='playButton'>Play movie</button>
            </div>) : (<div>
                <h3>total : 199kr</h3>
                <form  onSubmit={handleSubmit}>
         <div className='paymentform'>
         Card Number:
         <input type="text" onChange={handleCardNumberChange} value={cardNumber} placeholder='1234567891234567'></input>
         Exp. Date:
         <input type="text" onChange={handleExpDateChange} value={ExpDate} placeholder='MM/YY'></input>
         CVV/CVC:
         <input type="text" onChange={handleCVVChange} value={CVV}placeholder='123'></input>
         Name on Card:
         <input type="text" onChange={handleNameChange} value={cardName} placeholder='Jamile Jonson'></input>
         </div>
         <button type='submit'> Submit Payment</button>
         </form>
            </div>)}
           

         
         

       
         
         

        </div>
        
    )
}

export default Payment