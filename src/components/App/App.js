import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import TemplatePage from '../TemplatePage/TemplatePage';
import Login from '../Login/Login';
import useToken from './useToken';


function App() {
  console.log('in page');

  const { token, setToken } = useToken();  

  if(!token) {
    return <Login setToken={setToken} />
  }
  // const path=`/main/${token.Id}`;
  
  return (
    <Router>
            <Switch>
            <Route path="/main/:id" component={MainPage}></Route>
            
            {/* <Route path="/template/:id" component={TemplatePage}></Route> */}
            <Route path="/template/:id/:name" component={TemplatePage}></Route>  
            <Redirect from="/" to={{pathname: `/main/${token.Id}`}}/>          
            </Switch>
            </Router>
  );
}

export default App;

