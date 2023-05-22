import React, { useState, useEffect } from 'react';
import '../compontents/paymentsucsessfull.css'
import { useNavigate } from 'react-router-dom';

const PaymentSucsessfull = () => {

  const [progress, setProgress] = useState(0);
  let navigate = useNavigate();

  //Show this component for 3 seconds then navigate back to MovieInfo with the "last clickedMovie data"

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => prevProgress + 20); // Adjust the increment value as per your preference
    }, 400); // Adjust the interval duration (in milliseconds) as per your preference

    setTimeout(() => {
      clearInterval(progressInterval);
      navigate('/movieInfo/');
    }, 3000); // Adjust the duration (in milliseconds) for showing the component before redirection

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className='payment_sucsessfull_wrapper'>Processing payment..
      <progress className='progress_bar' value={progress} max="100" />
    </div>
  )
}

export default PaymentSucsessfull;