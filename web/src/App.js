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
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
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
