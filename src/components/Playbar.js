import React from 'react';
import StreamService from '../services/StreamService';
import { fmtMSS, url } from '../util/helpers';
import '../assets/scrollbar.css';
import '../assets/trackbar.css';

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
            playlistVisible: false,
            playlistEditMode: false,
        };
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.tick = this.tick.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.playIndex = this.playIndex.bind(this);
        this.deleteIndex = this.deleteIndex.bind(this);
        this.togglePlaylist = this.togglePlaylist.bind(this);
        this.togglePlaylistEditMode = this.togglePlaylistEditMode.bind(this);
        this.closePlaylist = this.closePlaylist.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
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
        let currentTime = parseInt(this.state.stream.currentTime);
        let duration = this.state.stream.duration ? parseInt(this.state.stream.duration) : 0;
        this.setState({
            currentTime: currentTime,
            duration: duration,
            percent: currentTime / (duration || 0.1) * 100,
            track: StreamService.getTrack(),
            playing: !this.state.stream.paused || false,
        });
        if(this.state.currentTime >= this.state.duration) {
            this.next();
        }
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

    next() {
        StreamService
        .loadNext()
        .then(this.play);
    }

    prev() {
        StreamService
        .loadPrev()
        .then(this.play);
    }

    playIndex(index) {
        StreamService
        .loadFromIndex(index)
        .then(this.play);
    }

    deleteIndex(index) {
        StreamService
        .removeFromPlaylist(index)
        .then();
    }

    moveUp(index) {
        StreamService
        .moveUp(index)
        .then();
    }

    moveDown(index) {
        StreamService
        .moveDown(index)
        .then();
    }

    togglePlaylist() {
        this.setState({
            playlistVisible: !this.state.playlistVisible
        });
    }

    togglePlaylistEditMode() {
        this.setState({
            playlistEditMode: !this.state.playlistEditMode
        });
    }

    closePlaylist() {
        this.setState({
            playlistVisible: false,
            playlistEditMode: false,
        });
    }

    handleDrag(event) {
        this.setState({percent: parseInt(event.target.value)});
        StreamService
        .scrub(parseInt(event.target.value / 100 * this.state.duration))
        .then();
    }


    render() {
        return (
            <div className="bg-gray-300 text-gray-800 border-gray-400 border-t h-24 px-3 pt-2 shadow-lg flex items-center justify-between">

                { this.state.track && 
                    <div className="flex items-center">
                        <div className="w-40">
                            <img className="absolute h-32 -mt-24 rounded-lg" alt="Album cover" src={url() + "/" + this.state.track.album.cover}/>
                        </div>
                        <div className="ml-3 pb-2 leading-tight">
                            <h3 className="font-medium text-md">{this.state.track.artist.name}</h3>
                            <h2 className="font-bold text-xl">{this.state.track.title}</h2>
                        </div>
                    </div>
                }

                { !this.state.track && 
                    <div className="flex items-center">
                        <div className="w-40"><div className="absolute h-32 -mt-24 rounded-lg"/></div>
                        <div className="ml-3 pb-2 leading-tight"></div>
                    </div>
                }

                <div className="flex-1 flex flex-col items-center">

                    <div className="w-2/3 h-6 absolute bg-gray-900 rounded-full -mt-6 shadow-lg flex items-center px-3">
                        <div className="bg-blue-600" style={{ height: "2px", width: this.state.percent + "%" }}></div>
                        <div className="flex-1 bg-gray-800" style={{ height: "2px" }}></div>
                    </div>
                    <input class="absolute trackbar px-2 w-2/3 h-6 bg-gray-900 rounded-full -mt-6 overflow-hidden appearance-none focus:outline-none" type="range" min="0" max="100" step=".1" value={this.state.percent} onChange={this.handleDrag}/>

                    { this.state.loaded &&
                        <div className="text-sm font-semibold text-gray-600">{fmtMSS(this.state.currentTime)} / {fmtMSS(this.state.duration)}</div>
                    }

                    <div className="mt-2 flex items-center">
                        <button onClick={this.prev} className="w-8 h-8 text-gray-900 hover:text-gray-800 focus:outline-none">
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
                        <button onClick={this.next} className="w-8 h-8 text-gray-900 hover:text-gray-800 focus:outline-none">
                            <svg viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M8.56 1.44l9.547 9.545a1.5 1.5 0 010 2.122L8.56 22.653a1.5 1.5 0 11-2.122-2.122l8.486-8.485L6.439 3.56a1.5 1.5 0 112.122-2.122z" fill="currentColor"/></svg>
                        </button>
                    </div>

                </div>

                <div>
                    
                    { this.state.playlistVisible && <>
                        <div onClick={this.closePlaylist} className="w-screen h-screen top-0 left-0 absolute"></div>
                        <div className="absolute bottom-0 right-0 mb-20 mr-4 bg-gray-900 text-gray-100 py-6 px-8 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <h2 className="font-bold tracking-tight">Currently Playing</h2>
                                <button onClick={this.togglePlaylistEditMode} className="ml-2 text-xs tracking-tight text-gray-400">Edit</button>
                            </div>
                            <ul className="overflow-y-auto h-128 w-96 pretty-scrollbar">
                                { StreamService.getPlaylist().map((track, k) => (
                                    <li className="flex items-center my-4 mx-2 truncate">
                                        { this.state.playlistEditMode &&
                                            <div className="mr-4 flex flex-col items-center justify-center">
                                                { k !== 0 &&
                                                    <button onClick={() => this.moveDown(k)} className="text-gray-300 my-1">
                                                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.666 15.758l9.546-9.546a1.5 1.5 0 012.122 0l9.546 9.546a1.5 1.5 0 01-2.122 2.122l-8.485-8.486-8.485 8.486a1.5 1.5 0 11-2.122-2.122z" fill="currentColor"/>
                                                        </svg>
                                                    </button>
                                                }
                                                { k !== StreamService.getPlaylist().length - 1 &&
                                                    <button onClick={() => this.moveUp(k)} className="text-gray-300 my-1">
                                                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.88 8.334l-9.546 9.546a1.5 1.5 0 01-2.122 0L1.666 8.334a1.5 1.5 0 012.122-2.122l8.485 8.486 8.485-8.486a1.5 1.5 0 012.122 2.122z" fill="currentColor"/>
                                                        </svg>
                                                    </button>
                                                }
                                            </div>
                                        }
                                        <button onClick={this.state.playlistEditMode ? () => this.deleteIndex(k) : () => this.playIndex(k)} className="relative group focus:outline-none">
                                            <img className={`rounded-lg h-16 w-16 shadow ${k === StreamService.getIndex() ? 'border-gray-300' : 'border-gray-800'} ${this.state.playlistEditMode ? 'border-red-500 border-2' : 'border-4'}`} alt="Album cover" src={url() + "/" + track.album.cover} />
                                            { !this.state.playlistEditMode &&
                                                <div className="invisible group-hover:visible absolute top-0 left-0 w-full h-full rounded-lg text-gray-300 flex items-center justify-center bg-black opacity-50">
                                                    <svg viewBox="0 0 448 512" className="w-8 h-8">
                                                        <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
                                                    </svg>
                                                </div>
                                            }
                                            { this.state.playlistEditMode &&
                                                <div className="invisible group-hover:visible absolute top-0 left-0 w-full h-full rounded-lg text-gray-300 flex items-center justify-center bg-black opacity-50">
                                                    X
                                                </div>
                                            }
                                        </button>
                                        <div className="ml-4 truncate">
                                            <p className="font-bold text-lg truncate">{track.title}</p>
                                            <p className="text-sm truncate">{track.artist.name}</p>
                                            <p className="text-xs text-gray-600 truncate">{track.album.title}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>}

                    <button onClick={this.togglePlaylist} className="flex items-center mr-4 focus:outline-none">
                        <div className="bg-gray-900 text-gray-100 font-bold text-xs shadow rounded-full py-1 px-2 mr-1 flex items-center justify-center hover:bg-gray-800">
                            <span>{ StreamService.getPlaylist().length }</span>
                            <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21 7.333H3V5h18v2.333zM21 13.167H3v-2.334h18v2.334zM21 19H3v-2.333h18V19z" fill="currentColor"/>
                            </svg>
                        </div>
                    </button>
                </div>
                
            </div>
        );
    }

}
