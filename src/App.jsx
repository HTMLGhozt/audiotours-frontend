import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Map from './map.jsx';

const Home = () => <div>Home</div>;

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ lng: -91.1056957, lat: 29.9718272, title: 'test Marker' }],
    };
    this.updateMarkers = this.updateMarkers.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }
  updateMarkers(updateMarker) {
    const markers = this.state.markers.filter(marker => marker.name !== updateMarker.name);
    markers.push(updateMarker);
    this.setState({ markers });
  }
  addMarker(marker) {
    this.setState({ markers: [...this.state.markers, marker] });
  }
  render() {
    return (
      <div>
        Creator
        <form className="creatorForm">
          Title:
          <input type="text" />
          Description:
          <textarea name="description" maxLength="280" cols="50" rows="4" />
          <Map
            markers={this.state.markers}
            updateMarkers={this.updateMarkers}
            addMarker={this.addMarker}
          />
          {this.state.markers.map(({title, lat, lng}) => <div>{`${title}: ${lat} ${lng}`}</div>)}
          <label htmlFor="isPublished">
            <input type="checkbox" value="Publish" id="isPublished" />
            &nbsp;Publish?
          </label>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

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
