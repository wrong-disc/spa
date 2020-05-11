import React from 'react';
import AlbumService from '../../services/AlbumService';
import {NavLink} from 'react-router-dom';
import { pad } from '../../util/helpers';
import TrackService from '../../services/TrackService';
import StreamService from '../../services/StreamService';

export default class AlbumPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      album: null,
      loaded: false
    }
  }

  load() {
    let id = this.props.match.params.id;
    if(String(this.state.id) !== String(id)) {
      AlbumService
      .get(id)
      .then(album => this.setState({id: album.id, album: album, loaded: true}))
      .catch(console.log);
    }
  }

  componentDidMount = this.load;
  componentDidUpdate = this.load;

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

  render() {
    let album = this.state.album;

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        { this.state.loaded && <>

        <div className="flex mt-4 items-start">
          <img className="shadow-lg rounded-lg h-64 w-64" alt="Album cover" src={album.cover} />
          <div className="ml-6">
            <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">{album.title}</h1>
            <NavLink to={"/artist/" + album.artist.id} className="flex items-center">
              <img className="mt-4 shadow-lg rounded-full h-16 w-16" alt="Album cover" src={album.artist.photo} />
              <div className="mt-4">
                <p className="ml-4 text-gray-200 tracking-tight leading-tight">Album by</p>
                <p className="ml-4 text-xl font-bold text-gray-200 tracking-tight leading-tight">{album.artist.name}</p>
              </div>
            </NavLink>            
          </div>
        </div>

        <div className="mt-4 w-full">
          <h3 className="text-gray-200 font-bold tracking-tight text-3xl">Tracks</h3>
          { (album.tracks.length === 0) && 
            <p className="mt-2 text-gray-200 text-lg">There are no tracks in this album.</p>
          }
          <ul className="mt-4 mb-8 w-full flex flex-col items-start justify-start">


            { album.tracks.map(track => {
              let durationDate = new Date(track.duration);
              let duration = pad(durationDate.getMinutes(), 2) + ":" + pad(durationDate.getSeconds(), 2);

              return (
                <li className="flex items-center w-full py-1 px-4 py-1">
                  <div className="flex items-center w-1/4">
                    <button onClick={() => this.play(track)}>
                      <svg className="w-12 h-12 text-gray-200 hover:text-gray-500 cursor-pointer" viewBox="0 0 56 56" fill="none">
                        <path d="M53 28c0 13.807-11.193 25-25 25S3 41.807 3 28 14.193 3 28 3s25 11.193 25 25z" fill="#212121"/>
                        <path d="M19 42.5V14l24 14-24 14.5z" fill="currentColor"/>
                      </svg>
                    </button>
                    <p className="ml-4 text-gray-100 text-xl tracking-tight font-bold">{track.title}</p>
                  </div>
                  <NavLink to={"/artist/" + track.artist.id} className="w-1/4">
                    <p className="text-gray-100 text-xl tracking-tight font-bold">{track.artist.name}</p>
                  </NavLink>
                  <p className="text-gray-100 text-xl tracking-tight font-bold w-1/4">{duration}</p>
                  <p className="text-gray-100 text-xl tracking-tight font-bold w-1/4">
                    { track.favourite &&
                      <button onClick={() => this.unfavourite(track)}>
                        <svg viewBox="0 0 512 512" className="w-8 h-8">
                          <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                        </svg>
                      </button>
                    }
                    { !track.favourite &&
                      <button onClick={() => this.favourite(track)}>
                        <svg viewBox="0 0 512 512" className="w-8 h-8">
                          <path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                        </svg>
                      </button>
                    }
                  </p>
                </li>
              );
            }
            )}

          </ul>
        </div>
        
        
        </>}
      </div>

    );
  }

}
