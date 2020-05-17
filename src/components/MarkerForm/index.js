import React from 'react';
import uid from 'uid'
import './style.scss';

class MarkerForm extends React.Component {
    state = {
        type: 'cords'
    }

    onTypeChange = (e) => {
        this.setState({ type: e.target.id })
    }

    onSubmitCords = () => {
        const marker = {
            location: [Number(this.lat.value), Number(this.lng.value)],
            id: uid()
        }
        this.lat.value = '';
        this.lng.value = '';

        this.props.addMarker(marker);
    }

    render() {
        return (
            <div className="marker-form">
                <h3>Coordinates Form</h3>
                <div className="type-selection">
                    <div>
                        <input type="radio" id="cords" name="marker" value="cords" onChange={this.onTypeChange} checked={this.state.type === 'cords'}/>
                        <label for="cords">Add by cords</label>
                    </div>
                    <div>
                        <input type="radio" id="place" name="marker" onChange={this.onTypeChange} value="place" checked={this.state.type === 'place'}/>
                        <label for="place">Add by place</label>
                    </div>
                </div>
                {this.state.type === 'cords' && (
                    <div className="cords">
                        <div className="input">
                            <label for="lat">lat:</label>
                            <input className="lat" id="lat" ref={(ref) => this.lat = ref}/>
                        </div>
                        <div className="input">
                            <label for="lng">lng:</label>
                            <input id="lng" ref={(ref) => this.lng = ref}/>
                        </div>
                        <button className="cords-button button" onClick={this.onSubmitCords}>Submit cords</button>
                    </div>
                )}
            </div>
        )
    }
}

export default MarkerForm;