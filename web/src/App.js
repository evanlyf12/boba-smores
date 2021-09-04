import './App.scss';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Login from './Pages/login';
import Dashboard from './Pages/dashboard';
function App() {
  return (
    <main>
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,800&display=swap" />
    <Router>
      <Switch>
        
        {/* Home page route */}
        <Route path="/" exact component={Dashboard}/>
        <Route path="/login" exact component={Login}/>  

      </Switch>
    </Router>
    </main>
  );
}

export default App;
