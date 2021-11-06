import './App.scss';
import './styles/buttonStyles.scss';
import React from 'react';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Login from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
function App() {

  return (
    <main>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,800&display=swap" />
        <Router>
            <Switch>
            <Route path='/dashboard' exact component={Dashboard}/>
            <Route path="/login" exact component={Login}/>  
            <Route path="/*" exact component={Login}/>  
            </Switch>
        </Router>
    </main>
  );
}

export default App;
