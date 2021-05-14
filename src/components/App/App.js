import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import TemplatePage from '../TemplatePage/TemplatePage';
import Login from '../Login/Login';
import useToken from './useToken';
import './App.css';


function App() {
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
    <Router>
            <Switch>
            <Route path="/main" component={MainPage}></Route>
            <Route path="/template/:id/:name" component={TemplatePage}></Route>  
            <Redirect from="/" to={{pathname: `/main`, state: { user: token }}}/>          
            </Switch>
            </Router>
    </div>
  );
}

export default App;