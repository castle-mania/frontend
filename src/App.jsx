import 'rsuite/dist/styles/rsuite-dark.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home'
import Castle from './pages/Castle'
import Lootboxes from './pages/Lootboxes'
import Leaderbords from './pages/Leaderboards'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <Route path="/" exact component={Home}/>
        <Route path="/Castle" exact component={Castle}/>
        <Route path="/Lootboxes" exact component={Lootboxes}/>
        <Route path="/Leaderboards" exact component={Leaderbords}/>
      </Router>
    </div>
  );
}

export default App;
