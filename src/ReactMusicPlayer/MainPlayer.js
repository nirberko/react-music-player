import React from 'react';
import PropTypes from 'prop-types';

import HOCAudio from './HOCAudio';
import Poster from './Poster';
import Controls from './Controls';
import TimeLine from './TimeLine';

import './css/MainPlayer.scss';

const MainPlayer = (props) => (
    <div className="MainPlayer">
        {props.playlist.length ? <React.Fragment>
            <Poster {...props} />
            <TimeLine {...props} />
            <Controls {...props} />
        </React.Fragment> : <React.Fragment><strong>There is no playlist</strong></React.Fragment>}
    </div>
);

MainPlayer.propTypes = {
    autoPlay: PropTypes.bool,
    playlist: PropTypes.array,
};

MainPlayer.defaultProps = {
    autoPlay: false,
    playlist: [],
};

export default HOCAudio(MainPlayer);