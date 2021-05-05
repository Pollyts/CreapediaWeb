import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import TemplatePage from '../TemplatePage/TemplatePage';
import Login from '../Login/Login';
import useToken from './useToken';
import logo from './logo4x.png';
import './App.css';


function App() {
  console.log('in page');

  const { token, setToken } = useToken();  

  if(!token) {
    return (
      <div>
{/* <img src={logo} className="bcgImage" /> */}
<Login setToken={setToken} />
      </div>
    )
  }
  // const path=`/main/${token.Id}`;
  
  return (
    <div>
      {/* <img src={logo} className="bcgImage" /> */}
    <Router>
            <Switch>
            <Route path="/main/:id" component={MainPage}></Route>
            
            {/* <Route path="/template/:id" component={TemplatePage}></Route> */}
            <Route path="/template/:id/:name" component={TemplatePage}></Route>  
            <Redirect from="/" to={{pathname: `/main/${token.Id}`}}/>          
            </Switch>
            </Router>
            </div>
  );
}

export default App;

