import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router";
import {BrowserRouter as Router,Link,Switch,Route, Redirect, withRouter} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import './Login.css';
import Registration from '../Registration/Registration'

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
      <div className='header'>Creapedia</div>
      <form className='login-wrapper' onSubmit={handleSubmit}>
        <label className="form-row">
          <p>Почта</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label className="form-row">
          <p>Пароль</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label className="form-row">
          <button type="submit">ВХОД</button>
        </label>
      </form>
      <Link className="RegistrationLink" to={{pathname:`/registration`, state: {body:null}}}> 
                             Регистрация
                              </Link>                              
      </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};