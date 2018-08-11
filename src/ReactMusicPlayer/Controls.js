import React from 'react';

import VolumeControl from './VolumeControl'

import './css/Controls.scss';

const Controls = (props) => {
    const {states, methods} = props;

    return (
        <div className="Controls">
            <div />
            <div className="Controls__playButtons">
                <button className="Controls__playButtons__back" onClick={methods.skipToPrevious}
                        disabled={states.currentSong.first}><i /><i /></button>
                {states.playing ? <button className="Controls__playButtons__pause" onClick={methods.togglePlayPause}>
                    <i/>
                    <i/>
                </button> :
                    <button className="Controls__playButtons__play" onClick={methods.togglePlayPause}><i/></button>}
                <button className="Controls__playButtons__next" onClick={methods.skipToNext}
                        disabled={states.currentSong.last}><i /><i /></button>
            </div>
            <VolumeControl {...props} />
        </div>
    )
};

export default Controls;