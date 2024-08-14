import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LockIcon from '@mui/icons-material/Lock';
import '../../components/Login/login.css';
import { Link, useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    recaptchaToken: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [activeButton, setActiveButton] = useState('login');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if credentials are stored in local storage
    const savedCredentials = JSON.parse(localStorage.getItem('credentials'));
    if (savedCredentials) {
      setFormData(savedCredentials);
    }
  }, []);

  const fields = [
    { name: 'email', label: <Person3OutlinedIcon className="icon-color" />, type: 'email', placeholder: 'Email Address', validation: 'Email is required', pattern: /\S+@\S+\.\S+/, patternError: 'Email is invalid' },
    { name: 'password', label: <LockOutlinedIcon className="icon-color" />, type: showPassword ? 'text' : 'password', placeholder: 'Password', validation: 'Password is required', pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, patternError: 'Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, one number, and one special character', icon: true },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const errors = {};
    fields.forEach(field => {
      if (!formData[field.name]) {
        errors[field.name] = field.validation;
      } else if (field.pattern && !field.pattern.test(formData[field.name])) {
        errors[field.name] = field.patternError;
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
        const response = await axios.post('http://localhost:5000/login', formData);

        if (formData.rememberMe) {
          localStorage.setItem('credentials', JSON.stringify({
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe
          }));
        } else {
          localStorage.removeItem('credentials');
        }

        setFormData({
          email: '',
          password: '',
          rememberMe: false,
          recaptchaToken: ''
        });
        setErrors({});
        navigate('/dashboard');
      } catch (error) {
        console.error('There was an error!', error);
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
      {fields.map(field => (
        <div key={field.name} className={`form-field ${field.icon ? 'password' : ''}`}>
          <span  className="logo-span">
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
            <span  className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffOutlinedIcon className="icon-color" /> : <VisibilityOutlinedIcon className="icon-color" />}
            </span>
          )}
          {errors[field.name] && <span className="error">{errors[field.name]}</span>}
        </div>
      ))}
      <ReCAPTCHA
        sitekey="6LekLR0qAAAAAFIyRVN3a7wz771hAJUDlXAPZFXE"
        onChange={onChange}
      />
      <div className="check-box-forgot-password">
        <div className="remember-me-container">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div className="forgot-password-container">
          <LockIcon style={{ fontSize: 15, paddingLeft: '25px' }} className="forgot-password-icon" />
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>
        </div>
      </div>
      <button type="submit">Login</button>
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
    </form>
  );
};

export default LoginForm;
