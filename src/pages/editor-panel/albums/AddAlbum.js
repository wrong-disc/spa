import React from 'react';
import AlbumService from '../../../services/AlbumService';


export default class AddAlbumPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {}
    }
  }

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Add Album</h1>
        

      </div>

    );
  }

}
