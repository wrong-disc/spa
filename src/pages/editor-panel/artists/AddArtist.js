import React from 'react';
import ArtistService from '../../../services/ArtistService';
import Dropzone from "dropzone";
import { api } from '../../../util/helpers';
import AuthService from '../../../services/AuthService';

export default class AddArtistPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: {},
      dropzone : null
    }
  }

  componentDidMount(){
    AuthService.getToken().then((token) => {
      this.setState({
        dropzone:new Dropzone("div#upload-photo", this.settings(token))
      });    
    });
  }

  settings(token){
    return {
      paramName: "photo",
      url: api('artists'),
      acceptedFiles: "image/*",
      params: {name:this.state.artist.name},
      headers: {
        "X-XSRF-TOKEN": this.getCookie("X-XSRF-TOKEN")
      },
      success: (e, res) => {}
    };
  }

   getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Add Artist</h1>
        <div className="flex flex-col mt-2 ">
          <input type="text" placeholder="Artist Name" className="mt-4 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" />
        </div>
        <div id="upload-photo">
          <div className="flex items-center justify-center cursor-pointer">
            upload photo
          </div>
        </div>
      </div>


    );
  }

}
