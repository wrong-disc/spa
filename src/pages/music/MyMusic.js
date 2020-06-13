import React from 'react';
import TrackService from '../../services/TrackService';
import {NavLink} from 'react-router-dom';
import StreamService from '../../services/StreamService';

export default class MyMusicPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        tracks: [],
        loaded: false
    };
  }

  componentDidMount() {
    TrackService
    .favouriteTracks()
    .then(tracks => this.setState({ tracks: tracks, loaded: true }))
    .catch(err => console.log);
  }

  play(track) {
      StreamService
      .load(track)
      .then(() => {
        StreamService
        .play();
      })
  }

  favourite(track) {
    TrackService
    .favourite(track.id)
    .then(() => {
      track.favourite = true;
      this.forceUpdate();
    })
    .catch(console.log);
  }

  unfavourite(track) {
    TrackService
    .unfavourite(track.id)
    .then(() => {
      track.favourite = false;
      this.forceUpdate();
    })
    .catch(console.log);
  }

  addToPlaylist(track) {
    StreamService.addToPlaylist(track)
    .then().catch();
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-start px-4 py-4">

        <h1 className="ml-4 text-4xl border-gray-800 border-b text-white font-bold tracking-tight">My Music</h1>
        
        <div className="mt-8 flex items-center justify-between flex-wrap w-full">

          {this.state.loaded && this.state.tracks.map(track => (

            <div className="mx-2 my-2 w-1/6 flex flex-col items-center leading-tight group" key={track.id}>
              <div to={"/album/" + track.album.id} className="relative">
                <img className="shadow-lg rounded-lg" alt="Album cover" src={track.album.cover} />
                <div className="absolute bg-black w-full h-full top-0 left-0 rounded-lg opacity-75 invisible group-hover:visible flex flex-col justify-center items-center px-12">
                  <button className="text-5xl absolute top-0 left-0 mt-4 ml-4 text-gray-100 focus:outline-none hover:text-gray-400">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" onClick={() => this.addToPlaylist(track)}>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.666 15.758l9.546-9.546a1.5 1.5 0 012.122 0l9.546 9.546a1.5 1.5 0 01-2.122 2.122l-8.485-8.486-8.485 8.486a1.5 1.5 0 11-2.122-2.122z" fill="currentColor"/>
                    </svg>
                  </button>
                  <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-100 focus:outline-none hover:text-gray-400">
                    { track.favourite &&
                      <svg viewBox="0 0 512 512" className="w-6 h-6" onClick={() => this.unfavourite(track)}>
                        <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                      </svg>
                    }
                    { !track.favourite &&
                      <svg viewBox="0 0 512 512" className="w-6 h-6" onClick={() => this.favourite(track)}>
                        <path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                      </svg>
                    }
                  </button>
                  <button onClick={() => this.play(track)} className="text-gray-100 text-xl tracking-tight font-bold focus:outline-none hover:text-gray-400">
                    <svg viewBox="0 0 448 512" className="w-10 h-10">
                      <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
                    </svg>
                  </button>
                  <NavLink
                    to={"/album/" + track.album.id}
                    className="absolute bottom-0 mb-4 border-2 border-gray-200 text-gray-200 py-1 w-4/5 rounded hover:bg-gray-200 hover:text-gray-900 text-center">
                      Go to Album
                  </NavLink>
                </div>
              </div>
              <h2 className="mt-2 text-gray-100 font-bold text-lg truncate">{track.title}</h2>
              <NavLink to={"/artist/" + track.artist.id}>
                <h3 className="text-gray-100 text-xs">{track.artist.name}</h3>
              </NavLink>
            </div>

          ))}

          {/* Fake elements to pad out flex-grid when <5 elements in grid */}
          {[...Array(4)].map((e, i) => <div className="mx-4 my-4 w-1/6" key={i} />)}

        </div>

      </div>

    );
  }

}
