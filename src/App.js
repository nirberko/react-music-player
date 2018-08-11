import React, {Component} from 'react';

import MainPlayer from './components/MainPlayer'

import HeyMercyMP3 from './res/Pierce_Murphy-Hey_Mercy.mp3'
import HeyMercyPoster from './res/Pierce_Murphy-Hey_Mercy.jpg'

import RunningEiskrokodilMP3 from './res/Lobo_Loco-Running_Eiskrokodil.mp3'
import RunningEiskrokodilPoster from './res/Lobo_Loco-Running_Eiskrokodil.jpg'

import './App.scss'

class App extends Component {
    constructor(props) {
        super(props);

        this.playlist = [
            {
                file: HeyMercyMP3,
                poster: HeyMercyPoster,
                song: 'Hey Mercy',
                artist: 'Pierce Murphy',
            },
            {
                file: RunningEiskrokodilMP3,
                poster: RunningEiskrokodilPoster,
                song: 'Running Eiskrokodil',
                artist: 'Lobo Loco',
            }
        ]
    }

    render() {
        return (
            <div className="App">
                <MainPlayer playlist={this.playlist} />
            </div>
        );
    }
}

export default App;
