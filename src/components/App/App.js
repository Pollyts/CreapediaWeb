import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, withRouter} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import TemplatePage from '../TemplatePage/TemplatePage';
import FolderPage from '../FolderPage/FolderPage';
import ElementPage from '../ElementPage/ElementPage';
import TemplateElementPage from '../TemplateElementPage/TemplateElementPage';
import Login from '../Login/Login';
import useToken from './useToken';
import Registration from '../Registration/Registration'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'
import './App.css';


function App(props) {
  
  const { token, setToken } = useToken();  //Получение данных из localstorage

  if(!token) //при отсутствии данных в localstorage
  {
    return (
        <Router>
            <Switch>            
            <Route path="/registration" component={Registration}></Route>  
            <Route path="/login"><Login setToken={setToken}/></Route>     
            <Redirect from="/" to={{pathname: `/login`}}></Redirect>
            </Switch>
            </Router>  
    )
  }    
  //при наличии данных в localstorage
  return <BreadCrumbs token={token}/>
  ;
}

export default withRouter(App);