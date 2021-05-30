import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

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
        this.state={mail:null, password:null, ifregister:null};
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
        alert("успешно");  
        this.setState({ifregister: true});
      }
    render(){
        if(this.state.ifregister)
        {
            return <Redirect to={{pathname: '/', state: { body: null}            
  }}/>}
       return(
            <div className="body">
      <div className='header'>Регистрация</div>
      <form className='login-wrapper' onSubmit={this.handleSubmit}>
        <label className="form-row">
          <p>Почта</p>
          <input type="text" value={this.state.mail} onChange={this.onChangeMail} />
        </label>
        <label className="form-row">
          <p>Пароль</p>
          <input type="password" value={this.state.password} onChange={this.onChangePassword}/>
        </label>
        <label className="form-row">
          <button type="submit">Зарегистрироваться</button>
        </label>
      </form>
      </div>
        )
    }
}