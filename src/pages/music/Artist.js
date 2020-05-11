import React from 'react';
import ArtistService from '../../services/ArtistService';
import {NavLink} from 'react-router-dom';

export default class ArtistPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      artist: null,
      loaded: false
    }

  }

  load() {
    let id = this.props.match.params.id;
    if(String(this.state.id) !== String(id)) {
      ArtistService
      .get(id)
      .then(artist => this.setState({id: artist.id, artist: artist, loaded: true}))
      .catch(console.log);
    }
  }

  componentDidMount = this.load;
  componentDidUpdate = this.load;

  render() {
    let artist = this.state.artist;

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        { this.state.loaded && <>

        <div className="flex mt-2 items-center">
          <img className="mt-2 shadow-lg rounded-full h-24 w-24" alt="Artist" src={artist.photo} />
          <h1 className="ml-6 text-4xl border-gray-800 border-b text-white font-bold tracking-tight">{artist.name}</h1>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-gray-200 font-bold tracking-tight text-3xl">Albums</h3>
          { (artist.albums.length === 0) && 
            <p className="mt-2 text-gray-200 text-lg">This artist has no albums.</p>
          }

          <div className="mt-2 flex items-center justify-between flex-wrap">

            {artist.albums.map(album => (

              <div className="mx-2 my-2 w-1/6 flex flex-col items-center leading-tight" key={album.id}>
                <NavLink to={"/album/" + album.id}>
                  <img className="shadow-lg rounded-lg" alt="Album cover" src={album.cover} />
                </NavLink>
                <h2 className="mt-2 text-gray-100 font-bold text-lg">{album.title}</h2>
                <NavLink to={"/artist/" + album.artist.id}>
                  <h3 className="text-gray-100 text-xs">{album.artist.name}</h3>
                </NavLink>
              </div>

            ))}

            {/* Fake elements to pad out flex-grid when <5 elements in grid */}
            {[...Array(4)].map((e, i) => <div className="mx-4 my-4 w-1/6" key={i} />)}

          </div>
        </div>
        
        
        </>}
      </div>

    );
  }

}
