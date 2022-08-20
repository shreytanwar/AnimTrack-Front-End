import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Header from './Components/Atoms/Header/Header';

import SignIn from './Components/Atoms/UserSign/SignIn/SignIn';
import SignUp from './Components/Atoms/UserSign/SignUp/SignUp';
import SearchResult from './Components/Molecules/SearchResult/SearchResult';
import Details from './Components/Pages/Details/Details';
import Home from './Components/Pages/Home/Home';
import Results from './Components/Pages/Results/Results';

function App() {
  return (
    <div className="App">
       <Router>
        <Header/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/searchResults' exact component={Results}/>
          <Route path="/details/:id" exact component={Details} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/SignIn" exact component={SignIn} />
          {/* <Route path="/Lists" exact component={Lists} /> */}
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
