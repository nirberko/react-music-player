import React, {Component} from 'react';

const HOCAudio = (Player) => {
    class HOCAudioComponent extends Component {
        constructor(props) {
            super(props);

            this.playlist = props.playlist.map((song, index) => ({
                ...song,
                index,
                first: (index === 0),
                last: (index + 1 === props.playlist.length)
            }));

            this.state = {
                progress: 0,
                volume: 1,
                currentSong: undefined,
                playing: false,
            };

            this.autoPlay = false;

            this.handleEndedProgress = this.handleEndedProgress.bind(this);
            this.onEnded = this.onEnded.bind(this);
            this.onPlay = this.onPlay.bind(this);
            this.onPause = this.onPause.bind(this);
            this.setVolume = this.setVolume.bind(this);
            this.skipToNext = this.skipToNext.bind(this);
            this.skipToPrevious = this.skipToPrevious.bind(this);
            this.togglePlayPause = this.togglePlayPause.bind(this);
        }

        componentWillMount() {
            this.audioElement = document.createElement('audio');
            this.audioElement.addEventListener('canplay', this.onCanPlay);
            this.audioElement.addEventListener('ended', this.onEnded);
            this.audioElement.addEventListener('play', this.onPlay);
            this.audioElement.addEventListener('pause', this.onPause);

            if (this.playlist.length) {
                this.setSong(this.playlist[0]);
            }

            this.setVolume(0.75);
        }

        setSong(song) {
            this.setState({
                currentSong: song
            });

            this.audioElement.src = song.file;
            this.audioElement.load();

            if (this.autoPlay) {
                this.audioElement.play();
            }

            this.setState({progress: 0});
        }

        onPlay() {
            this.autoPlay = true;
            this.setState({playing: true});
            this.intervalId = setInterval(() => {
                this.setState({progress: this.audioElement.currentTime});
            }, 800);
        }

        onPause() {
            this.setState({playing: false,});

            if (this.intervalId !== null) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }

        onEnded() {
            this.autoPlay = true;
            this.handleEndedProgress();
        }

        handleEndedProgress() {
            this.skipToNext();
        }

        setProgress(newProgress) {
            let progress = newProgress;

            if (this.audioElement.currentTime) {
                if (progress > this.audioElement.duration) {
                    progress = this.audioElement.duration;
                }

                this.audioElement.currentTime = progress;
            }
        }

        togglePlayPause() {
            this.autoPlay = !this.state.playing;
            if (this.state.playing) {
                this.audioElement.pause();
            } else {
                this.audioElement.play();
            }
        }

        skipToNext() {
            if (this.playlist.length > this.state.currentSong.index + 1) {
                this.setSong(this.playlist[this.state.currentSong.index + 1])
            }
        }

        skipToPrevious() {
            if (this.state.currentSong.index > 0) {
                this.setSong(this.playlist[this.state.currentSong.index - 1])
            }
        }

        setVolume(volume) {
            this.audioElement.volume = volume;
            this.setState({volume});
        }

        render() {
            const newProps = {
                ...this.props,
                methods: {
                    togglePlayPause: this.togglePlayPause,
                    setVolume: this.setVolume,
                    skipToNext: this.skipToNext,
                    skipToPrevious: this.skipToPrevious,
                    setProgress: this.setProgress.bind(this),
                },
                states: {
                    playing: this.state.playing,
                    volume: this.state.volume * 100,
                    duration: this.audioElement.duration,
                    progress: this.state.progress,
                    currentSong: this.state.currentSong,
                },
            };

            return (
                <Player {...newProps} />
            )
        }
    }

    return HOCAudioComponent;
};
export default HOCAudio;