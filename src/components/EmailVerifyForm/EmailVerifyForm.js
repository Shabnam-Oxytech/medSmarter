import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "../EmailVerifyForm/emailVerify.css"

const EmailVerifyForm = () => {
  return (
    <div className="outer" >
      <div className="middle">
        
              <div className="inner">
                <img src="/verificationLogo.png" className="fevicon" alt="" />
                <div class="verify-section">
                  <img src="/verificationSuccess.png" className="verified" alt="" />
                  <h1>Verified</h1>
                  <h3>You have already verified your account.</h3>
                  <div className="login-button"><Button><a href="http://localhost:3000/" >CONTINUE TO LOGIN</a></Button></div>
            </div>
        </div>
      </div>
  </div>

  )
}

export default EmailVerifyForm



