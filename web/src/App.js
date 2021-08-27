import './App.scss';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Login from './Pages/login';
import Dashboard from './Pages/dashboard';
function App() {
  return (
    <main>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
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
