import React, { useState, useEffect } from 'react';
import '../compontents/paymentsucsessfull.css'
import { useNavigate } from 'react-router-dom';

const PaymentSucsessfull = () => {

  const [progress, setProgress] = useState(0);
  let navigate = useNavigate();

  

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => prevProgress + 20); 
    }, 400); 

    setTimeout(() => {
      clearInterval(progressInterval);
      navigate('/movieInfo/');
    }, 3000);

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