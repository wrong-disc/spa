import React from 'react';
import AlbumService from '../../../services/AlbumService';
import ArtistService from '../../../services/ArtistService';

export default class EditAlbumPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      artist_id: null,
      artists: [],
      loaded: false,
      album: null,
      artistsLoaded: false,
      cover: null,
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    AlbumService
    .get(id)
    .then((album) => this.setState({
      album: album,
      artist_id: album.artist.id,
      title: album.title,
      loaded:true
    }))
    .catch(console.log);
    ArtistService
    .all()
    .then(artists => this.setState({artists: artists, artistsLoaded: true}))
    .catch(console.log)
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

  handleCover = (event) => {
    this.setState({
      cover: event.target.files[0],
    });
  }

  save = () => {
    AlbumService
    .update(this.props.match.params.id, {
      title: this.state.title,
      artist_id: this.state.artist_id,
      cover: this.state.cover,
    })
    .then(() => this.props.history.push("/editor/album"))
    .catch(console.log);
  }

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Edit Album</h1>
        {this.state.loaded && this.state.artistsLoaded && <>
          <div className="flex flex-col mt-2 ">
            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Cover</p>
            <input type="file" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow bg-gray-300" onChange={this.handleCover}/>

            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Title</p>
            <input type="text" placeholder="Album Title" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleTitle} defaultValue={this.state.album.title}/>
            
            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Artist</p>
            <select className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleArtist} >
              {this.state.artists.map(artist => {
                return artist.id === this.state.album.artist.id ?
                <option selected value={artist.id}>{artist.name}</option>
                :<option value={artist.id}>{artist.name}</option>
              })} 
            </select>
          </div>
          <button className="mt-4 bg-gray-800 text-gray-200 py-2 px-8 rounded-full font-bold text-lg shadow focus:outline-none hover:bg-gray-900 active:bg-gray-700" onClick={this.save}>
            Save
          </button>
        </>}
      </div>
    );
  }

}
