import React from 'react';
import './App.scss';
import Header from './components/header-search/index';
import Results from './components/results/index';
import Detail from './components/detail/index';
import history from './History';
import { Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
      // Manejo del enrrutado en el proyecyo
      <Router history={history}>
        <div className="App">
        <Header />
        <div className="content">
          <Router history={history}>
            <Switch>
              <Route path='/items/:id'>
                <Detail />
              </Route>
              <Route path='/items' component={Results} />
              <Route path='/'>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
      </Router>
    );
}

export default App;
