import 'rsuite/dist/styles/rsuite-dark.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home'
import Castle from './pages/Castle'
import Lootboxes from './pages/Lootboxes'
import Marketplace from './pages/Marketplace'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="content">
      <Router>
        <Route path="/" exact component={Home}/>
        <Route path="/Castle" exact component={Castle}/>
        <Route path="/Lootboxes" exact component={Lootboxes}/>
        <Route path="/Marketplace" exact component={Marketplace}/>
      </Router>
      </div>
    </div>
  );
}

export default App;
