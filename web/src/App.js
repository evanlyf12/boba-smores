import './App.scss';
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Login from './Pages/login';
import Dashboard from './Pages/dashboard';
import { isUserLoggedIn } from './Auth';
function App() {

  console.log(isUserLoggedIn());
  return (
    <main>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
    <Router>
      <Switch>
      <Route path='/dash' render={() => 
                <>
                <Dashboard  />
                </>
                }
              />
        <Route path="/login" exact component={Login}/>  
        <Route path="/*" exact component={Login}/>  
      </Switch>
    </Router>
    </main>
  );
}

export default App;
