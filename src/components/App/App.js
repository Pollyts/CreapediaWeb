import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, withRouter} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import TemplatePage from '../TemplatePage/TemplatePage';
import FolderPage from '../FolderPage/FolderPage';
import ElementPage from '../ElementPage/ElementPage';
import TemplateElementPage from '../TemplateElementPage/TemplateElementPage';
import Login from '../Login/Login';
import useToken from './useToken';
import './App.css';


function App(props) {
  function handleClick(e) {
    e.preventDefault();
    props.history.push("/");
    localStorage.clear();    
    window.location.reload();      
  }
  const { token, setToken } = useToken();  //Получение данных из localstorage

  if(!token) //при отсутствии данных в localstorage
  {
    return (
      <div>
          <Login setToken={setToken} />
      </div>
    )
  }  
  //при наличии данных в localstorage
  return (
    <div>
    <button className="btn_logout" onClick={handleClick}>Выйти</button>
    <Router>
            <Switch>
            <Route path="/main" component={MainPage}></Route>
            <Route path="/template" component={TemplatePage}></Route>
            <Route path="/projects" component={FolderPage}></Route> 
            <Route path="/element" component={ElementPage}></Route>
            <Route path="/telement" component={TemplateElementPage}></Route>
            <Route path="/registration" component={TemplateElementPage}></Route>   
            <Redirect from="/" to={{pathname: `/main`, state: {body:token}}}/>          
            </Switch>
            </Router>
    </div>
  );
}

export default withRouter(App);