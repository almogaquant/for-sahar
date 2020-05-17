import React from 'react';
import MarkersList from '../MarkersList';
import MarkerForm from '../MarkerForm';
import MarkersHeader from '../MarkersHeader';
import './style.scss';

const MarkersPanel = ({markers, addMarker, deleteMarker, changeMapName, mapName, onSaveClick}) => 
    <div className="markers-panel">
            <MarkersHeader onSaveClick={onSaveClick} changeMapName={changeMapName} mapName={mapName}/>
        <div>
            <MarkerForm addMarker={addMarker}/>
            <MarkersList markers={markers} deleteMarker={deleteMarker}/>
        </div>
    </div>

export default MarkersPanel;