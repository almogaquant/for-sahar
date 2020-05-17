import React from 'react';
import Map from './components/Map';
import MarkersPanel from './components/MarkersPanel';
import { createMap, updateMap, getMap } from './actions';
import './App.scss';

class App extends React.Component {
  state = {
    markers: [],
    mapName: '',
    mapId: ''
  };

  componentDidMount = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const mapId = params.get('MapId');

    if (mapId) {
      getMap(mapId)
        .then(({markers, map}) => {
          this.setState({ 
            markers: [...this.state.markers, ...markers],
            mapId: map.Id,
            mapName: map.Name
           })
        })
        .catch(() => console.log('oops'));
    }
  }

  addMarker = (marker) => {
    const { mapId } = this.state;

    updateMap({mapId, markersToInsert: [marker]})
      .then(() => console.log('wow'))
      .catch(() => console.log('shit'));

    this.setState({ markers: [...this.state.markers, marker] })
  }

  deleteMarker = (markerToDelete) => {
    const { markers, mapId } = this.state;

    if (!markers.length) { return; }
    const index = markers.findIndex((marker) => marker.id === markerToDelete.id)
    const newMarkers = markers;
    newMarkers.splice(index, 1);
    
    updateMap({mapId, markersToDelete: [markerToDelete]})
      .then(() => {this.setState({ markers: newMarkers })})
      .catch(() => console.log('shit'));
  }

  changeMapName = (mapName) => this.setState({ mapName })

  onSaveClick = () => {
    const { markers, mapName, mapId } = this.state;

    if (!mapId) {
      createMap({mapName, markers})
        .then((mapId) => {
          this.setState({mapId})
        })
        .catch(() => console.log('shit'));
    } else {
      updateMap({mapId, mapName})
        .then(() => console.log('wow'))
        .catch(() => console.log('shit'));
    }
  }

  render() {
    const {
      markers,
      mapName
    } = this.state;

    return (
      <div className="app">
          <MarkersPanel markers={markers} addMarker={this.addMarker} onSaveClick={this.onSaveClick}
                  deleteMarker={this.deleteMarker} changeMapName={this.changeMapName} mapName={mapName}/>
          <Map markers={markers}/>
      </div>
    );
  };
};

export default App;
