import React from 'react';
import TrackService from '../../../services/TrackService';
import {NavLink} from 'react-router-dom';

export default class ListTracksPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      track: null,
      loaded: false
    }
  }

  load() {
    TrackService
    .all()
    .then(tracks => this.setState({ tracks: tracks, loaded: true}))
    .catch(console.log);
  }

  delete(track){
    TrackService
    .destroy(track.id)
    .then(()=>this.load())
    .catch(console.log);
  }

  componentDidMount = this.load;

  render() {
    const tracks = this.state.tracks;

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h3 className="text-gray-200 font-bold tracking-tight text-3xl border-gray-800 border-b">Tracks</h3>
          <NavLink exact={true} to="/editor/track/add">
            <div className="mt-4 bg-green-600 text-gray-200 py-2 px-8 rounded-full font-bold text-lg shadow focus:outline-none hover:bg-green-700 active:bg-green-500" >
              Create track
            </div>
          </NavLink>
        { this.state.loaded && <>
        <div className="mt-4 w-full">
          { (tracks.length === 0) && 
            <p className="mt-2 text-gray-200 text-lg">There are no Tracks.</p>
          }
          <ul className="mt-4 mb-8 w-full flex flex-col items-start justify-start">

            { tracks.map(track => (
              <li className="flex items-center w-full py-1 px-4 py-1">
                <div className="flex items-center w-1/4">
                  <img src={track.album.cover} className= "rounded-lg h-10 w-10"/>
                  <p className="ml-4 text-gray-100 text-xl tracking-tight font-bold">{track.title}</p>
                </div>
                <div className="flex items-center w-1/4">
                  <p className="ml-4 text-gray-100 text-xl tracking-tight font-bold">{track.artist.name}</p>
                </div>
                <div className="flex items-center w-1/4">
                  <p className="ml-4 text-gray-100 text-xl tracking-tight font-bold">{track.album.title}</p>
                </div>
                <div className="flex items-center w-1/4">
                  <NavLink exact={true} className="text-gray-600 hover:text-gray-500" to={`/editor/track/edit/${track.id}`}>
                    <svg className="h-6 w-6"  viewBox="0 0 24 24" fill="none">
                      <path d="M19 13v5a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5l2.672 2.5m3.914-3.914a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </NavLink>
                  <button className="text-red-700 hover:text-red-600 ml-4 " onClick={()=>this.delete(track)}>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.56 1.44l9.547 9.545a1.5 1.5 0 010 2.122L3.56 22.653a1.5 1.5 0 11-2.122-2.122l8.486-8.485L1.439 3.56a1.5 1.5 0 112.122-2.122z" fill="currentColor"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.925 22.652l-9.546-9.545a1.5 1.5 0 010-2.122l9.546-9.546a1.5 1.5 0 112.12 2.122l-8.484 8.485 8.485 8.485a1.5 1.5 0 11-2.121 2.122z" fill="currentColor"/>
                    </svg>
                    
                  </button>
                </div>
              </li>            
            ))}

          </ul>
        </div>
        
        
        </>}
      </div>

    );
  }

}
