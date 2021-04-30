import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div>
      <MainPage userinfo={token}/>
      {/* <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/mainpage">
            
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter> */}
      
    </div>
  );
}

export default App;