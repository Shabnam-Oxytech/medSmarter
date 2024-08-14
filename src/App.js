// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/Login/loginFrom'; 
import RegistrationForm from './components/RegistrationForm/RegistrationForm'; 
import ResetPasswordForm from './components/ForgotPassword/ResetPassword';
import ForgotPasswordForm from './components/ForgotPassword/ForgotPassword';
import EmailVerifyForm from './components/EmailVerifyForm/EmailVerifyForm';
import DashBoard from './components/DashBoard/dashBoard';

const App = () => {
  
    const router = createBrowserRouter(
      [
      {
        path: '/',
        element: <LoginForm />
      },
      {
        path: '/register',
        element: <RegistrationForm />
      },
      {
        path: '/forgot-password',
        element:  <ForgotPasswordForm />
      },
      {
        path: '/reset-password',
        element: <ResetPasswordForm />
      },
      {
        path: '/verify-email',
        element:  <EmailVerifyForm />
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      }
    ])
    return (
      <>
      <RouterProvider router={router} />
      </>
  );
};

export default App;
