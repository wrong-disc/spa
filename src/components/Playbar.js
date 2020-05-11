import React from 'react';
import StreamService from '../services/StreamService';
import { fmtMSS } from '../util/helpers';

export default class PlaybarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            stream: null,
            loaded: false,
            currentTime: 0,
            duration: 0,
            percent: 0,
            track: null,
        };
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        StreamService
        .init()
        .then(stream => {
            this.setState({
                stream: stream,
                loaded: true,
                currentTime: 0,
                duration: 0,
                timer: setInterval(this.tick, 500)
            });
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    tick() {
        this.setState({
            currentTime: parseInt(this.state.stream.currentTime),
            duration: this.state.stream.duration ? parseInt(this.state.stream.duration) : 0,
            percent: this.state.stream.currentTime / this.state.stream.duration * 100,
            track: StreamService.getTrack(),
            playing: !this.state.stream.paused || false,
        });
    }

    play() {
        StreamService
        .play()
        .then(playing => this.setState({playing: playing}));
    }

    pause() {
        StreamService
        .pause()
        .then(playing => this.setState({playing: playing}));
    }

    render() {
        return (
            <div className="bg-gray-300 text-gray-800 border-gray-400 border-t h-24 px-3 pt-2 shadow-lg flex items-center justify-between">

                { this.state.track && 
                    <div className="flex items-center">
                        <div className="w-40">
                            <img className="absolute h-32 -mt-24 rounded-lg" alt="Album cover" src={this.state.track.album.cover}/>
                        </div>
                        <div className="ml-3 pb-2 leading-tight">
                            <h3 className="font-medium text-md">{this.state.track.artist.name}</h3>
                            <h2 className="font-bold text-xl">{this.state.track.title}</h2>
                        </div>
                    </div>
                }

                <div className="flex-1 flex flex-col items-center">

                    <div className="w-2/3 h-6 absolute bg-gray-900 rounded-full -mt-6 shadow-lg flex items-center px-3">
                        <div className="bg-blue-600" style={{ height: "2px", width: this.state.percent + "%" }}></div>
                        <div className="bg-gray-200 rounded-full w-3 h-3"></div>
                        <div className="flex-1 bg-gray-800" style={{ height: "2px" }}></div>
                    </div>

                    { this.state.loaded &&
                        <div className="text-sm font-semibold text-gray-600">{fmtMSS(this.state.currentTime)} / {fmtMSS(this.state.duration)}</div>
                    }

                    <div className="mt-2 flex items-center">
                        <button className="w-8 h-8 text-gray-900 hover:text-gray-800 focus:outline-none">
                            <svg viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M16.44 22.56l-9.547-9.545a1.5 1.5 0 010-2.122l9.546-9.546a1.5 1.5 0 012.122 2.122l-8.486 8.485 8.486 8.485a1.5 1.5 0 01-2.122 2.122z" fill="currentColor"/></svg>
                        </button>
                        {!this.state.playing &&
                            <button onClick={this.play} className="mx-2 w-12 h-12 text-gray-900 hover:text-gray-800 focus:outline-none">
                                <svg viewBox="0 0 56 56"><path d="M53 28c0 13.807-11.193 25-25 25S3 41.807 3 28 14.193 3 28 3s25 11.193 25 25z" fill="currentColor"/><path d="M19 42.5V14l24 14-24 14.5z" fill="#fff"/></svg>
                            </button>
                        }
                        {this.state.playing &&
                            <button onClick={this.pause} className="mx-2 w-12 h-12 text-gray-900 hover:text-gray-800 focus:outline-none">
                                <svg viewBox="0 0 56 56"><path d="M53 28c0 13.807-11.193 25-25 25S3 41.807 3 28 14.193 3 28 3s25 11.193 25 25z" fill="currentColor"/><path fill="#fff" d="M19 16h6v24h-6zM31 16h6v24h-6z"/></svg>
                            </button>
                        }
                        <button className="w-8 h-8 text-gray-900 hover:text-gray-800 focus:outline-none">
                            <svg viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M8.56 1.44l9.547 9.545a1.5 1.5 0 010 2.122L8.56 22.653a1.5 1.5 0 11-2.122-2.122l8.486-8.485L6.439 3.56a1.5 1.5 0 112.122-2.122z" fill="currentColor"/></svg>
                        </button>
                    </div>

                </div>

                <div></div>
                
            </div>
        );
    }

}
