import React from 'react';
import Marker from '../Marker';
import './style.scss';

const MarkersList = ({markers, deleteMarker}) => 
    <div className="markers-list">
        {!!markers.length && <p>Coordinates list</p>}
        {markers.map((marker) =>
            <Marker key={marker.id} onClick={deleteMarker} marker={marker}/>
        )}
    </div>

export default MarkersList;