import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router";
import {Link} from "react-router-dom";
import logo from '../App/logo4x.png';
import './Login.css';

async function loginUser (login, password)
{
    return fetch(process.env.REACT_APP_API_USERS+`?mail=${login}&pass=${password}`,{
        method:'GET',
        headers: {
          'Content-Type':'application/json'
      }}).then(data => data.json())
}


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault();
    const user = await loginUser(
      username,
      password
    );
    const token={
      "Mail": user.Mail,
      "Password": user.Password 
    }
    history.push({
      pathname:  "/"
   });
    console.log(token);
    setToken(token)
  }

  return(
    <div className="body">  
    <div className="border">       
      <form className='login-wrapper' onSubmit={handleSubmit}>
      <img className="logologin" src={logo} alt="toolbaritem"/>
      <div className='header'>Creapedia</div>
        <label className="form-row">
          <p>почта</p>
          <input type="text" placeholder="exapmle@email.com" onChange={e => setUserName(e.target.value)} />
        </label>
        <label className="form-row">
          <p>пароль</p>
          <input type="password" placeholder="•••••••••••••" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="loginlinks">
        <Link className="RegistrationLink" to={{pathname:`/registration`, state: {body:null}}}> 
                             регистрация
                              </Link>
        <Link className="ForgotPass" to={{pathname:`/registration`, state: {body:null}}}> 
                             забыли пароль?
                              </Link>
                              </div>
        <label className="form-row">
          <button type="submit">войти</button>
        </label>
      </form>
           
                              </div>                          
      </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};