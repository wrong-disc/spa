import React from 'react';
import TrackService from '../../../services/TrackService';


export default class AddTrackPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {}
    }
  }

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Add Track</h1>
        

      </div>

    );
  }

}
