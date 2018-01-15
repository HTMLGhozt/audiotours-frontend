import React, { Component } from 'react';

export default class GMap extends Component {
  static defaultProps = {
    initialCenter: { lng: -90.1056957, lat: 29.9717272 },
  };
  constructor(props) {
    super(props);
    this.state = { zoom: 10 };
    this.handleZoomChange = this.handleZoomChange.bind(this);
  }
	render = () => (
    <div
      className='GMap-canvas'
      ref='mapCanvas'
      style={{width: 500+'px', height: 500+'px'}}
    ></div>
  );

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google
    this.map = this.createMap();
    this.marker = this.createMarker();
    this.infoWindow = this.createInfoWindow();
  
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    window.google.maps.event.addListener(this.map, 'zoom_changed', this.handleZoomChange);
  }

  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed');
  }

  createMap() {
    const mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
    };
    return new window.google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  mapCenter() {
    const { lat, lng } = this.props.initialCenter;
    return new window.google.maps.LatLng( lat, lng );
  }

  createMarker() {
    return new window.google.maps.Marker({
      position: new window.google.maps.LatLng({ lng: -91.1056957, lat: 29.9718272 }),
      map: this.map,
    });
	}

  createInfoWindow() {
    const contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new window.google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString,
    });
  }

  handleZoomChange() {
    const zoom = this.map.getZoom();
    this.setState({ zoom });
  }
}
