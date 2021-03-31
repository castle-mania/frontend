import 'rsuite/dist/styles/rsuite-dark.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home'
import Castle from './pages/Castle'
import Lootboxes from './pages/Lootboxes'
import Marketplace from './pages/Marketplace'
import NavBar from './components/NavBar'
import DiscordAuth from './pages/DiscordAuth'
import Footer from './components/Footer'
import Kingdom from './pages/Kingdom'

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="page-container">
      <div className="content">
      <Router>
        <NavBar setUser={setUser}/>
        <Switch>
          <Route user={user} path="/" exact component={Home}/>
          <Route user={user} path="/Castle" exact component={Castle}/>
          <Route user={user} path="/Lootboxes" exact component={Lootboxes}/>
          <Route user={user} path="/Marketplace" exact component={Marketplace}/>
          <Route user={user} path="/Kingdom" exact component={Kingdom}/>
          <Route user={user} path="/discord/callback" exact component={DiscordAuth}/>
        </Switch>
      </Router>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
