import React from 'react';
import AlbumService from '../../../services/AlbumService';
import ArtistService from '../../../services/ArtistService';
import TrackService from '../../../services/TrackService';

export default class AddTrackPage extends React.Component {

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
      file: null,
      duration: 0,
    }
  }

  componentDidMount(){
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

  handleFile = (event) => {
    this.setState({
      file: event.target.files[0],
    });
    let objectUrl = URL.createObjectURL(event.target.files[0]);
    var myAudio = document.getElementById("audio-test");
    myAudio.addEventListener("canplaythrough", e => {
      let seconds = parseInt(e.currentTarget.duration);
      this.setState({
        duration: seconds,
      });
    });
    myAudio.src = objectUrl;
  }

  save = () => {
    TrackService
    .create({
      title: this.state.title,
      artist_id: this.state.artist_id,
      album_id: this.state.album_id,
      album_index: this.state.album_index,
      file: this.state.file,
      duration: this.state.duration,
    })
    .then(() => this.props.history.push("/editor/track"))
    .catch(console.log);
  }

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Add Track</h1>
        {(this.state.albumsLoaded && this.state.artistsLoaded) && <>
          <div className="flex flex-col mt-2 ">
            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Title</p>
            <input type="text" placeholder="Track Title" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleTitle}/>
            
            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Artist</p>
            <select className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleArtist}>
              <option value="" selected>Choose Artist</option>
              {this.state.artists.map(artist => <option value={artist.id}>{artist.name}</option>)}
            </select>

            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Album</p>
            <select className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleAlbum}>
              <option value="" selected>Choose Album</option>
              {this.state.albums.map(album => <option value={album.id}>{album.title}</option>)}
            </select>

            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Track Number</p>
            <input placeholder="Track Number" type="number" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" min="1" onChange={this.handleIndex}/>

            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Audio file</p>
            <input type="file" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow bg-gray-300" onChange={this.handleFile}/>
            <audio id="audio-test"></audio>
          </div>
          <button className="mt-4 bg-gray-800 text-gray-200 py-2 px-8 rounded-full font-bold text-lg shadow focus:outline-none hover:bg-gray-900 active:bg-gray-700" onClick={this.save}>
            Create
          </button>
        </>}
      </div>
    );
  }

}
