import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Map from './map.jsx';

const Home = () => <div>Home</div>;

const Creator = () => (
  <div>
    Creator
    <form className="creatorForm">
      Title:
      <input type="text" />
      Description:
      <textarea name="description" maxLength="280" cols="50" rows="4" />
      <Map />
      <label htmlFor="isPublished">
        <input type="checkbox" value="Publish" id="isPublished" />
        &nbsp;Publish?
      </label>
      <input type="submit" value="Save" />
    </form>
  </div>
);

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
