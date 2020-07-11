import React from 'react';
import ArtistService from '../../../services/ArtistService';

export default class EditArtistPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      artist: null,
      loaded: false,
    }
  }

  componentDidMount(){ 
    let id = this.props.match.params.id;
    ArtistService
      .get(id)
      .then((artist) => this.setState({
        artist: artist,
        name: artist.name, 
        loaded:true
      }))
      .catch(console.log);
  }

  handleName = (event) => {
      this.setState ({
          name: event.target.value,
      });
  }

  save = () => {
    ArtistService
    .update(
      this.props.match.params.id, 
        {
          name: this.state.name,     
        }
    )
    .then(() => this.props.history.push("/editor/artist"))
    .catch(console.log);
  }

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Edit Artist</h1>
        {this.state.loaded && <>
          <div className="flex flex-col mt-2 ">
            <input type="text" placeholder="Artist Name" className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleName} defaultValue={this.state.artist.name}/>
          </div>
          <button className="mt-4 bg-gray-800 text-gray-200 py-2 px-8 rounded-full font-bold text-lg shadow focus:outline-none hover:bg-gray-900 active:bg-gray-700" onClick={this.save}>
            Save
          </button>
        </>}
      </div>
    );
  }

}
