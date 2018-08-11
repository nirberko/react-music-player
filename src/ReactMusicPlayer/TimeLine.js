import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './css/TimeLine.scss';

class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeStampLine: 0,
            timeLineWidth: 0,
        };

        this.timeLineWidth = 0;
    }

    componentDidMount() {
        this.timeLineWidth = ReactDOM.findDOMNode(this.timelineRef).getBoundingClientRect().width;

        this.setState({
            timeLineWidth: this.timeLineWidth,
        })
    }

    componentDidUpdate() {
        let duration = 0;

        if (!isNaN(this.props.states.duration)) {
            duration = this.props.states.duration;

            let percentage = this.props.states.progress / duration * 100;

            if (this.state.timeStampLine !== percentage) {
                this.setState({
                    timeStampLine: percentage
                });
            }
        }
    }

    onMouseDown(e) {
        this.setState({
            mouseDown: true,
        });

        const timelineDisToLeft = e.target.parentNode.getBoundingClientRect().left;
        const newTranslate = e.pageX - timelineDisToLeft;

        const percentage = newTranslate / this.state.timeLineWidth * 100;

        this.props.methods.setProgress(this.props.states.duration * percentage / 100);
    }

    render() {
        return (
            <div className="TimeLine">
                <div className="TimeLine__progress">
                    <div className="TimeLine__progress__line" ref={node => this.timelineRef = node}
                         onMouseDown={this.onMouseDown.bind(this)}>
                        <div className="TimeLine__progress__line__fill" style={{width: `${this.state.timeStampLine}%`}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Timeline;