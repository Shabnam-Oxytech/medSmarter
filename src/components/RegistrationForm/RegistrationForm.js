import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../../components/RegistrationForm/registration.css';
import { Link, useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    recaptchaToken: ''
  });

  const [errors, setErrors] = useState({});
  const [activeButton, setActiveButton] = useState('register');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const fields = [
    { name: 'firstName', label: <Person3OutlinedIcon className="icon-color" />, type: 'text', placeholder: 'First Name', validation: 'First name is required' },
    { name: 'lastName', label: <Person3OutlinedIcon className="icon-color" />, type: 'text', placeholder: 'Last Name', validation: 'Last name is required' },
    { name: 'email', label: <MailOutlineIcon className="icon-color" />, type: 'email', placeholder: 'Email Address', validation: 'Email is required', pattern: /\S+@\S+\.\S+/, patternError: 'Email is invalid' },
    { name: 'password', label: <LockOutlinedIcon className="icon-color" />, type: showPassword ? 'text' : 'password', placeholder: 'Password', validation: 'Password is required', pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, patternError: 'Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, one number, and one special character', icon: true },
    { name: 'confirmPassword', label: <LockOutlinedIcon className="icon-color" />, type: showConfirmPassword ? 'text' : 'password', placeholder: 'Retype Password', validation: 'Confirm password is required', match: 'password', matchError: 'Passwords do not match', icon: true }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    fields.forEach(field => {
      if (!formData[field.name]) {
        errors[field.name] = field.validation;
      } else if (field.pattern && !field.pattern.test(formData[field.name])) {
        errors[field.name] = field.patternError;
      } else if (field.match && formData[field.name] !== formData[field.match]) {
        errors[field.name] = field.matchError;
      }
    });
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && formData.recaptchaToken) {
      try {
        const response = await axios.post('http://localhost:5000/register', formData);

        if (response.status === 200) {
          setOpen(true); // Open modal on successful registration
        }
      } catch (error) {
        if (error.response) {
          setErrors({ server: error.response.data.message });
        } else {
          console.error('There was an error!', error);
          setErrors({ server: 'An unknown error occurred. Please try again later.' });
        }
      }
    }
  };

  const handleButtonClick = (button) => {
    navigate(button === 'login' ? '/' : '/register');
  };

  const onChange = (token) => {
    setFormData({ ...formData, recaptchaToken: token });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear form data
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      recaptchaToken: ''
    });
    setErrors({});
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="logo-container">
        <img src="/reg-logo.png" alt="Logo" className="logo" />
      </div>
      <div className="button-container">
        <button 
          type="button"
          className={`toggle-button ${activeButton === 'login' ? 'active' : ''}`}
          onClick={() => handleButtonClick('login')}
        >
          Log In
        </button>
        <button
          type="button"
          className={`toggle-button ${activeButton === 'register' ? 'active' : ''}`}
          onClick={() => handleButtonClick('register')}
        >
          Registration
        </button>
      </div>
      <div className="separator-container">
        <hr className="separator" />
      </div>
      <div className="trial-text">
        Create Your Account & Start 15 days free trial now
      </div>
      {fields.map(field => (
        <div key={field.name} className={`form-field ${field.icon ? 'password' : ''}`}>
          <span className='logo-span'>
            {field.label}
          </span>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
          {field.icon && (
            field.name === 'password' ? (
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffOutlinedIcon className="icon-color" /> : <VisibilityOutlinedIcon className="icon-color" />}
              </span>
            ) : (
              field.name === 'confirmPassword' && (
                <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <VisibilityOffOutlinedIcon className="icon-color" /> : <VisibilityOutlinedIcon className="icon-color" />}
                </span>
              )
            )
          )}
          {errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </div>
      ))}
      <ReCAPTCHA
        sitekey="6LekLR0qAAAAAFIyRVN3a7wz771hAJUDlXAPZFXE"
        onChange={onChange}
      />
      <div className="terms-text">
        By signing in you agree to MedSmarter's terms & privacy policy.
      </div>
      <button type="submit">Register</button>
      {errors.server && <div className="error">{errors.server}</div>}
      <div className="signIn-text">
        - Sign In With -
      </div>
      <div className="social-icons">
        <Link to="YOUR_FACEBOOK_LOGIN_URL" className="facebook-icon">
          <FacebookSharpIcon style={{ color: '#3b5998', fontSize: 30 }} />
        </Link>
        <Link to="YOUR_GOOGLE_LOGIN_URL" className="google-icon">
          <GoogleIcon style={{ color: '#db4437', fontSize: 30 }} />
        </Link>
        <Link to="YOUR_LINKEDIN_LOGIN_URL" className="linkedIn-icon">
          <LinkedInIcon style={{ color: '#0e76a8', fontSize: 30 }} />
        </Link>
      </div>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box">
          <h2 id="modal-title">Thank you for registering!</h2>
          <p id="modal-description">Please check your email for further instructions.</p>
          <div className="modal-button-container">
              <button className="modal-button" onClick={handleClose}>OK</button>
            </div>
        </Box>
      </Modal>
    </form>
  );
};

export default RegistrationForm;
