import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import logo from '../App/logo4x.png';

async function SingUp (mail, password)
{   
    const user =   {
      "Mail":mail,
      "Password": password
   }
    await fetch(process.env.REACT_APP_API_USERS,{
        method: 'POST', // или 'PUT'
        body: JSON.stringify(user), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Access-Control-Request-Method':'POST',
            'Origin': 'http://localhost:3000',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}


export default class Registration extends Component{
    constructor(props){
        super(props); 
        this.state={mail:"", password:"", ifregister:null};
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    onChangeMail(e) {
        var val = e.target.value;
        this.setState({mail: val});
    }
    onChangePassword(e) {
        var val = e.target.value;
        this.setState({password: val});
    }
   
    handleSubmit = async e => {
        e.preventDefault();
        await SingUp(this.state.mail,this.state.password);
        alert("Вы зарегистрировались! Для подтверждения адреса, пожалуйста, перейдите по ссылке, отправленную вам на указанную почту");  
        this.setState({ifregister: true});
      }
    render(){
        if(this.state.ifregister)
        {
            return <Redirect to={{pathname: '/', state: { body: null}            
  }}/>}
       return(
<div className="body">  
    <div className="border">       
      <form className='login-wrapper' onSubmit={this.handleSubmit}>
      <img className="logo" src={logo} alt="toolbaritem"/>
      <div className='header'>Регистрация</div>
        <label className="form-row">
          <p>почта</p>
          <input type="text" value={this.state.mail} onChange={this.onChangeMail} placeholder="exapmle@email.com"/>
        </label>
        <label className="form-row">
          <p>пароль</p>
          <input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="•••••••••••••"/>
        </label>
        <div className="loginlinks">
        <Link className="RegistrationLink" to={{pathname:`/login`, state: {body:null}}}> 
                             назад
                              </Link>        
                              </div>
        <label className="form-row">
          <button type="submit">зарегистрироваться</button>
        </label>
      </form>
           
                              </div>                          
      </div>            
        )
    }
}