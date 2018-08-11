import React from 'react';

import './css/Poster.scss';

const toMMSS = inputSeconds => {
    const secs = parseInt(inputSeconds, 10);
    let minutes = Math.floor(secs / 60);
    let seconds = secs - minutes * 60;

    if (10 > minutes) {
        minutes = '0' + minutes;
    }
    if (10 > seconds) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
};

export default ({states}) => {
    const duration = isNaN(states.duration) ? 0 : states.duration;

    return (
        <div className="Poster" style={{backgroundImage: `url('${states.currentSong.poster}')`}}>
            <div className="Poster__container">
                <div />
                <div className="Poster__container__details">
                    <h4>{states.currentSong.artist}</h4><br />
                    <h2>{states.currentSong.song}</h2>
                </div>
                <div className="Poster__container__timeStamp">
                    <span className="TimeLine__timeStamp">{toMMSS(states.progress)}</span>
                    <span className="TimeLine__timeStamp">-{toMMSS(duration - states.progress)}</span>
                </div>
            </div>
        </div>
    )
};