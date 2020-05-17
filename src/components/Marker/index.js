import React from 'react';
import './style.scss';

const Marker = ({ marker, onClick }) => 
    <div className="marker">
        <p>{marker.location[0]}, {marker.location[1]}</p>
        <button onClick={() => onClick(marker)}>&times;</button>
    </div>

export default Marker;