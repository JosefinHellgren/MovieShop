import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import './passwordinput.css'

const PasswordInput = ({ icon, ...inputProps }) => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <input
        type={showPassword ? 'text' : 'password'}
        {...inputProps}
      />
      <FontAwesomeIcon
        icon={showPassword ? faEye : faEyeSlash}
        onClick={toggleShowPassword}
        className="password-input-icon"
      />
    </div>
  );
}

export default PasswordInput;
