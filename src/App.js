import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/mainpage">
            <MainPage />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;