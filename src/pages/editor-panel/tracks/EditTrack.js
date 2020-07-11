import React from 'react';
import AlbumService from '../../../services/AlbumService';
import ArtistService from '../../../services/ArtistService';
import TrackService from '../../../services/TrackService';

export default class EditTrackPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      artist_id: null,
      album_id: null,
      artists: [],
      albums: [],
      albumsLoaded: false,
      artistsLoaded: false,
      album_index: null,
      loaded: false,
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    TrackService
    .get(id)
    .then((track) => this.setState({
      track: track,
      title: track.title,
      album_id: track.album.id,
      artist_id: track.artist.id,
      album_index: track.album_index, 
      loaded:true
    }))
    .catch(console.log);
    ArtistService
    .all()
    .then(artists => this.setState({artists: artists, artistsLoaded: true}))
    .catch(console.log);
    AlbumService
    .all()
    .then(albums => this.setState({albums: albums, albumsLoaded: true}))
    .catch(console.log);
  }

  handleTitle = (event) => {
      this.setState ({
          title: event.target.value,
      });
  }

  handleArtist = (event) => {
    this.setState ({
        artist_id: event.target.value,
    });
  }

  handleAlbum = (event) => {
    this.setState ({
        album_id: event.target.value,
    });
  }

  handleIndex = (event) => {
    this.setState ({
        album_index: event.target.value,
    });
  }

  save = () => {
    TrackService
    .update(
      this.props.match.params.id,
      {
        title: this.state.title,
        artist_id: this.state.artist_id,
        album_id: this.state.album_id,
        album_index: this.state.album_index,
      }
    )
    .then(() => this.props.history.push("/editor/track"))
    .catch(console.log);
  }

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Edit Track</h1>
        {(this.state.albumsLoaded && this.state.artistsLoaded && this.state.loaded) && <>
          <div className="flex flex-col mt-2 ">
            <input type="text" placeholder="Track Title" className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleTitle} defaultValue={this.state.track.title}/>
            <select className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleArtist}>
              {this.state.artists.map(artist => {
                return artist.id == this.state.track.artist.id ?
                <option selected value={artist.id}>{artist.name}</option>
                :<option value={artist.id}>{artist.name}</option>
              })} 
            </select>
            <select className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleAlbum}>
            {this.state.albums.map(album => {
                return album.id == this.state.track.album.id ?
                <option selected value={album.id}>{album.title}</option>
                :<option value={album.id}>{album.title}</option>
              })} 
            </select>
            <input placeholder="Track Number" type="number" className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" min="1" onChange={this.handleIndex} defaultValue={this.state.track.album_index}/>
          </div>
          <button className="mt-4 bg-gray-800 text-gray-200 py-2 px-8 rounded-full font-bold text-lg shadow focus:outline-none hover:bg-gray-900 active:bg-gray-700" onClick={this.save}>
            Save
          </button>
        </>}
      </div>
    );
  }

}
