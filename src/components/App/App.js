import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, withRouter} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import TemplatePage from '../TemplatePage/TemplatePage';
import FolderPage from '../FolderPage/FolderPage';
import ElementPage from '../ElementPage/ElementPage';
import TemplateElementPage from '../TemplateElementPage/TemplateElementPage';
import Login from '../Login/Login';
import useToken from './useToken';
import Registration from '../Registration/Registration';
import Settings from '../Settings/Settings';
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
  return (
    <Router>
            <Switch>
            <Route path="/main" component={MainPage}></Route>
            <Route path="/template" component={TemplatePage}></Route>
            <Route path="/projects" component={FolderPage}></Route> 
            <Route path="/element" component={ElementPage}></Route>
            <Route path="/telement" component={TemplateElementPage}></Route>
            <Route path="/registration" component={Registration}></Route>   
            <Route path="/settings"><Settings body={token}/></Route>
            <Redirect from="/" to={{pathname: `/main`, state: {body:token}}}/>          
            </Switch>
            </Router>
  );
}

export default withRouter(App);