import React from 'react'
import './login.css'
import Topbar from '../main/Topbar'
import { useState } from 'react'
import {auth} from '../firebase'
import {signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[messError, setMessEror] = useState('')
  const navigate =  useNavigate();
//sign in Option
  const signinOption = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((useCrential)=>{
        navigate('/home');
    }).catch((error)=>{
        setMessEror('Email/password combination is wrong!')
    })
}
  return (
    <div className='loginWrapper'>
      <div className="loginLeft">
        <img src="assets/newama2.png" className='loginLogo' alt="" />
      </div>
      <div className="loginRight">
          <h3 className='formHeader'>Sign in</h3>
          <hr />
          <p className='errorMes'>{messError}</p>
           <div className='inputFields'> 
              <input value={email} onChange={(e)=> setEmail(e.target.value)}  className='LoginfieldInput' type="email" placeholder='Username/Email' />
              <input value={password} onChange={(e)=> setPassword(e.target.value)}  className='LoginfieldInput' type="password" placeholder='Password'  />
          </div>
          <div className='LoginbottomRow'>
              <button onClick={signinOption} className='signupButton'>Sign in</button>
              
          </div>

      </div>
      
    </div>
  )
}
