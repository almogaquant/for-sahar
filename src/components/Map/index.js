import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import './style.scss';

const BING_MAPS_KEY = 'Av6TwAZf98VQOYxo8vawIe-9l7TAsmPM2ZZ7WQsl92MtX_nyywvFiLfnsuQ4WFWt';

const Map = ({markers}) => {
  const center = markers[0] ? markers[0].location : [];
  const regularPolygons = markers.map((marker) => ({
    center: marker.location,
    option: {strokeThickness: 2, fillColor: 'rgba(0, 255, 0, 0.5)', strokeColor: 'red'},
    radius: 20,
    points: markers.length
  }));

  return (
    <ReactBingmaps 
        bingmapKey={BING_MAPS_KEY}
        className="map"
        center={center}
        pushPins = {markers}
        regularPolygons={regularPolygons}> 
    </ReactBingmaps>
  )
}
export default Map;
