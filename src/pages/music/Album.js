import React from 'react';
import AlbumService from '../../services/AlbumService';
import { pad } from '../../util/helpers';

export default class AlbumPage extends React.Component {

  constructor(props) {
    super(props);
    let id = this.props.match.params.id;

    this.state = {
      album: null,
      loaded: false
    }

    AlbumService
    .get(id)
    .then(album => this.setState({album: album, loaded: true}))
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
            <div className="flex items-center">
              <img className="mt-4 shadow-lg rounded-full h-16 w-16" alt="Album cover" src={album.artist.photo} />
              <div className="mt-4">
                <p className="ml-4 text-gray-200 tracking-tight leading-tight">Album by</p>
                <p className="ml-4 text-xl font-bold text-gray-200 tracking-tight leading-tight">{album.artist.name}</p>
              </div>
            </div>            
          </div>
        </div>

        <div className="mt-4 w-full">
          <h3 className="text-gray-200 font-bold tracking-tight text-3xl">Tracks</h3>
          { (album.tracks.length === 0) && 
            <p className="mt-2 text-gray-200 text-lg">There are no tracks in this album.</p>
          }
          <ul className="mt-4 mb-8 w-full flex flex-col items-start justify-start">


            { album.tracks.map(track => {
              let durationDate = new Date("1970-01-01 " + track.duration);
              let duration = pad(durationDate.getMinutes(), 2) + ":" + pad(durationDate.getSeconds(), 2);

              return (<li className="flex items-center w-full py-1 px-4 py-1">
              <div className="flex items-center w-1/3">
                <button>
                  <svg className="w-12 h-12 text-gray-200 hover:text-gray-500 cursor-pointer" viewBox="0 0 56 56" fill="none">
                    <path d="M53 28c0 13.807-11.193 25-25 25S3 41.807 3 28 14.193 3 28 3s25 11.193 25 25z" fill="#212121"/>
                    <path d="M19 42.5V14l24 14-24 14.5z" fill="currentColor"/>
                  </svg>
                </button>
                <p className="ml-4 text-gray-100 text-xl tracking-tight font-bold">{track.title}</p>
              </div>
              <p className="text-gray-100 text-xl tracking-tight font-bold w-1/3">{track.artist.name}</p>
              <p className="text-gray-100 text-xl tracking-tight font-bold w-1/3">{duration}</p>
            </li>);
            }
            )}

          </ul>
        </div>
        
        
        </>}
      </div>

    );
  }

}
