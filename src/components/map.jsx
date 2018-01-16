import React, { Component } from 'react';

export default class GMap extends Component {
  static defaultProps = {
    initialCenter: { lng: -90.1056957, lat: 29.9717272 },
  };
  constructor(props) {
    super(props);
    this.state = {
      zoom: 9,
      // markers: [],
      initialCenter: this.props.initialCenter,
      selectedMarker: { name: '', lat: null, lng: null },
    };
    this.createMarker = this.createMarker.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }
	render = () => (
    <div>
      <div
        className='GMap-canvas'
        ref='mapCanvas'
        style={{width: 1000+'px', height: 500+'px'}}
      ></div>
      {/* <span>selected Marker {this.state.selectedMarker.name + ': ' + this.state.selectedMarker.lat + ' ' + this.state.selectedMarker.lng}</span> */}
      <button onClick={this.addMarker}>Add Marker</button>
    </div>
  );

  componentDidMount() {
    this.map = this.createMap();

    const markers = this.props.markers.map(this.createMarker);
    this.setState({ markers });

    window.google.maps.event.addListener(
      this.map,
      'zoom_changed',
      () => this.setState({ zoom: this.map.getZoom() }),
    );
  }

  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed');
    this.props.markers.forEach(marker => marker.event.clearListeners('dragend'));
  }
  createMap() {
    const { zoom, initialCenter } = this.state;
    return new window.google.maps.Map(
      this.refs.mapCanvas,
      {
        zoom,
        center: new window.google.maps.LatLng(initialCenter),
      },
    );
  }
  addMarker(e) {
    e.preventDefault();
    const center = this.map.getCenter();
    this.props
      .addMarker({ title: 'new Marker', lat: center.lat(), lng: center.lng() })
      .then(markers => this.componentDidMount());
    // this.setState({ markers: [...this.state.markers, { title: 'new Marker', lat: center.lat(), lng: center.lng() }] });
    // this.props.addMarker({ title: 'new Marker', lat: center.lat(), lng: center.lng() })
    // this.componentDidMount();
  }
  createMarker(options) {
    const { lat, lng, title, key, audio } = options;
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng({ lat, lng }),
      map: this.map,
      draggable: true,
      title,
      key,
      audio
    });

    marker.addListener(
      'dragend',
      (e) => {
        this.props.updateMarkers({ audio, key, title, lat: e.latLng.lat(), lng: e.latLng.lng() });
        this.setState({ selectedMarker: { name: title, lat: e.latLng.lat(), lng: e.latLng.lng() }});
      },
    );

    return marker;
	}
  
  // createInfoWindow() {
  //   const contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
  //   return new window.google.maps.InfoWindow({
  //     map: this.map,
  //     anchor: this.marker,
  //     content: contentString, 
  //   });
  // }
}

/* xport default class GMap extends Component {
  static defaultProps = {
    initialCenter: { lng: -90.1056957, lat: 29.9717272 },
  };
  constructor(props) {
    super(props);
    this.state = {
      zoom: 9,
      markers: [],
      initialCenter: this.props.initialCenter,
      selectedMarker: { name: '', lat: null, lng: null },
    };
    this.createMarker = this.createMarker.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }
	render = () => (
    <div>
      <div
        className='GMap-canvas'
        ref='mapCanvas'
        style={{width: 1000+'px', height: 500+'px'}}
      ></div>
      {/* <span>selected Marker {this.state.selectedMarker.name + ': ' + this.state.selectedMarker.lat + ' ' + this.state.selectedMarker.lng}</span> }
      <button onClick={this.addMarker}>Add Marker</button>
    </div>
  );

  componentDidMount() {
    this.map = this.createMap();

    const markers = this.props.markers.map(this.createMarker);
    this.setState({ markers });

    // this.infoWindow = this.createInfoWindow();

    window.google.maps.event.addListener(
      this.map,
      'zoom_changed',
      () => this.setState({ zoom: this.map.getZoom() }),
    );
  }

  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed');
    this.state.markers.forEach(marker => marker.event.clearListeners('dragend'));
  }
  createMap() {
    const { zoom, initialCenter } = this.state;
    return new window.google.maps.Map(
      this.refs.mapCanvas,
      {
        zoom,
        center: new window.google.maps.LatLng(initialCenter),
      },
    );
  }
  addMarker(e) {
    e.preventDefault();
    const center = this.map.getCenter();
    this.props.addMarker({ title: 'new Marker', lat: center.lat(), lng: center.lng() });
    this.componentDidMount();
    // this.setState({ markers: [...this.state.markers, { title: 'new Marker', lat: center.lat(), lng: center.lng() }] });
    // this.props.addMarker({ title: 'new Marker', lat: center.lat(), lng: center.lng() })
    // this.componentDidMount();
  }
  createMarker(options) {
    const { lat, lng, title } = options;
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng({ lat, lng }),
      map: this.map,
      draggable: true,
      title,
    });

    marker.addListener(
      'dragend',
      (e) => {
        this.props.updateMarkers({ title: marker.title, lat: e.latLng.lat(), lng: e.latLng.lng() });
        this.setState({ selectedMarker: { name: marker.title, lat: e.latLng.lat(), lng: e.latLng.lng() }});
      },
    );

    return marker;
	}
  
  // createInfoWindow() {
  //   const contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
  //   return new window.google.maps.InfoWindow({
  //     map: this.map,
  //     anchor: this.marker,
  //     content: contentString, 
  //   });
  // }
} */