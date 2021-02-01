import 'rsuite/dist/styles/rsuite-dark.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Castle from './pages/Castle'
import Lootboxes from './pages/Lootboxes'
import Marketplace from './pages/Marketplace'
import NavBar from './components/NavBar'
import DiscordAuth from './pages/DiscordAuth'
import Commands from './pages/Commands'
import Footer from './components/Footer'

function App() {
  return (
    <div className="page-container">
      <div className="content">
      
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Castle" exact component={Castle}/>
          <Route path="/Lootboxes" exact component={Lootboxes}/>
          <Route path="/Marketplace" exact component={Marketplace}/>
          <Route path="/Commands" exact component={Commands}/>
          <Route path="/discord/callback" exact component={DiscordAuth}/>
        </Switch>
      </Router>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
