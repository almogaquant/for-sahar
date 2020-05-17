import React from 'react';
import './style.scss';

class MarkersHeader extends React.Component {
    onChangeMapName = (e) => {
        const { changeMapName } = this.props;
        changeMapName(e.target.value);
    }

    render() {
        const {
            mapName,
            onSaveClick
        } = this.props;

        const mapNameString = `${mapName} Map`;

        return (
            <div className="markers-header">
                <h2>{ mapNameString }</h2>
                <div className="map-name">
                    <p>Add Map Name: </p>
                    <input type="text" name="name" value={mapName} onChange={this.onChangeMapName} />
                </div>
                <button className="button" onClick={onSaveClick}>Save</button>
            </div>
        )
    }
}

export default MarkersHeader;