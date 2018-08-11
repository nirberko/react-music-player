import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './css/VolumeControl.scss';

class VolumeControl extends Component {
    constructor(props) {
        super(props);

        this.VolumeControlHeight = 0;

        this.state = {
            volumeHeight: props.states.volume,
        }
    }

    componentDidMount() {
        this.VolumeControlHeight = ReactDOM.findDOMNode(this.VolumeControlRef).getBoundingClientRect().height;
    }

    onMouseDown(e) {
        const timelineDisToTop = e.target.parentNode.getBoundingClientRect().bottom;
        let newTranslate = e.pageY - timelineDisToTop;
        newTranslate = 0 - (newTranslate / this.VolumeControlHeight * 100);

        const newVolume = newTranslate > 100 ? 100 : newTranslate < 0 ? 0 : newTranslate;

        this.setState({
            volumeHeight: newVolume
        });

        this.props.methods.setVolume(newVolume / 100);
    }

    render() {
        return (
            <div className="VolumeControl" ref={node => this.VolumeControlRef = node} onMouseDown={this.onMouseDown.bind(this)}>
                <div className="VolumeControl__volume">
                    <div className="VolumeControl__volume__fill" style={{height: `${this.state.volumeHeight}%`}} />
                </div>
            </div>
        )
    }
}

export default VolumeControl;