import './App.scss';
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Login from './Pages/login';
import Dashboard from './Pages/dashboard';
import { isUserLoggedIn } from './Auth';
function App() {
  const [userId,setUserId] = useState();

  useEffect (()=>{
    if (isUserLoggedIn){
      const check = JSON.parse(localStorage.getItem('cToken'));
      setUserId(check._id);
    }

  },[])



  return (
    <main>
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,800&display=swap" />
    <Router>
      <Switch>
      <Route exact path='/' render={() => 
                <>
                {userId &&<Dashboard userId={userId} />}
                </>
                }
              />
        <Route path="/login" exact component={Login}/>  

      </Switch>
    </Router>
    </main>
  );
}

export default App;
