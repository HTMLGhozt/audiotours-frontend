import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './components/home.jsx';
import Creator from './components/creator.jsx';

const Navigation = () => (
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/creator'>Creator</Link>
  </nav>
);
class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Route exact path={'/'} component={Home} />
        <Route path={'/creator'} component={Creator} />
      </Fragment>
    );
  }
}

export default App;
