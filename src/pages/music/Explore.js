import React from 'react';
import AlbumService from '../../services/AlbumService';
import {NavLink} from 'react-router-dom';

export default class ExplorePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        albums: [],
        loaded: false
    };
  }

  componentDidMount() {
    AlbumService
    .explore()
    .then(albums => this.setState({ albums: albums, loaded: true }))
    .catch(err => console.log);
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-start px-4 py-4">

        <h1 className="ml-4 text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Explore</h1>
        
        <div className="mt-8 flex items-center justify-between flex-wrap w-full">

          {this.state.loaded && this.state.albums.map(album => (

            <div className="mx-2 my-2 w-1/6 flex flex-col items-center leading-tight" key={album.id}>
              <NavLink to={"/album/" + album.id}>
                <img className="shadow-lg rounded-lg" alt="Album cover" src={album.cover} />
              </NavLink>
              <h2 className="mt-2 text-gray-100 font-bold text-lg truncate">{album.title}</h2>
              <NavLink to={"/artist/" + album.artist.id}>
                <h3 className="text-gray-100 text-xs">{album.artist.name}</h3>
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
