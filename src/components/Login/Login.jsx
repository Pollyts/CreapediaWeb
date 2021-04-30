import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser (login, password)
{
  console.log(login);
  console.log(password);
  console.log(process.env.REACT_APP_API_USERS);
    return fetch(process.env.REACT_APP_API_USERS+`?mail=${login}&pass=${password}`,{
        method:'GET',
        headers: {
          'Content-Type':'application/json'
      }}).then(data => data.json())
}


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      username,
      password
    );
    console.log(token);
    setToken(token)
  }

  return(
    <div>
      <div className='header'>Creapedia</div>
      <form className='login-wrapper' onSubmit={handleSubmit}>
        <label className="form-row">
          <p>Логин или почта</p>
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
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};