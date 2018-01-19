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
    this.user = props.user;
    this.state = {
      markers: [{ key: uniqid(), lng: -91.1056957, lat: 29.9718272, title: 'test Marker', audio: 'https://example.com' }],
    };

    this.updateMarkers = this.updateMarkers.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }
  parseMarkers() {
    // key: String,
    // name: { type: String, required: true },
    // coordinates: {
    //   type: { type: String, default: 'Point' },
    //   coordinates: [Number],
    // },
    // audio: { type: String, match: [urlRegex, 'Please fill a valid url.'] },
    const { markers } = this.state;
    return markers.map(({ lng, lat, title, key, audio }) => {
      return {
        key,
        coordinates: { type: 'Point', coordinates: [lng, lat] },
        name: title,
        audio,
      };
    });
  }
  saveTour(title, description, isPublished) {
    console.log(this.user);
    fetch('http://localhost:3000/api/tours/newTour', {
      method: 'POST',
      body: JSON.stringify({
        id: this.user.id,
        name: title,
        description,
        isPublished,
        points: this.parseMarkers(),
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
      .then(async res => {
        if (res.status === 201) {
          const user = await res.json();
          console.log(user);
        }
      });
  }
  render() {
    let title, description, isPublished;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.saveTour(title.value, description.value, isPublished.value);
        title.value = description.value = isPublished.value
      }}>
        Title:
        <input ref={node => title = node} type="text" />
        Description:
        <textarea ref={node => description = node} name="description" maxLength="280" cols="50" rows="4" />
        <Map
          markers={this.state.markers}
          updateMarkers={this.updateMarkers}
          addMarker={this.addMarker}
        />
        <Table markers={this.state.markers} />
        <label htmlFor="isPublished">
          <input ref={node => isPublished = node} value="true" type="checkbox" id="isPublished" />
          &nbsp;Publish?
        </label>
        <input type="submit" value="Save" />
      </form>
    );
  }
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