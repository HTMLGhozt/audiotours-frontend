import React, { Component, Fragment } from 'react';
import uniqid from 'uniqid';
import Map from './map.jsx';

const Table = ({ markers }) => (
  <table>    
    <thead>
      <tr>
      <th>name</th>
      <th>lat</th>
      <th>lng</th>
      <th>audio</th>
    </tr>
  </thead>
  <tbody>
    {markers.map(marker => (
      <tr>
        <td><input type="text" value={marker.title}/></td>
        <td><input type="text" value={marker.lat}/></td>
        <td><input type="text" value={marker.lng}/></td>
        <td>{marker.audio} <button></button></td>
      </tr>
    ))}
  </tbody>
  </table>
);

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ key: uniqid(), lng: -91.1056957, lat: 29.9718272, title: 'test Marker', audio: null }],
    };

    this.updateMarkers = this.updateMarkers.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }
  render = () => (
    <Fragment>
      <Map
        markers={this.state.markers}
        updateMarkers={this.updateMarkers}
        addMarker={this.addMarker}
      />
      <Table markers={this.state.markers} />
    </Fragment>
  );
  async updateMarkers(updateMarker) {
    const markers = this.state.markers.map(marker => marker.key === updateMarker.key ? updateMarker : marker);
    console.log(markers);
    await this.setState(() => ({ markers }));
  }
  async addMarker(marker) {
    marker.key = uniqid();
    marker.audio = '';
    await this.setState(() => ({ markers: [...this.state.markers, marker] }));
  }
  async addAudio(aMarker) {

  }
}

export default Creator; 

/* class Creator extends Component {
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
} */