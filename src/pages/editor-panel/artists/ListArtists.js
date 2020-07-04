import React from 'react';
import ArtistService from '../../../services/ArtistService';

export default class ListArtistsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      artists: null,
      loaded: false
    }
  }

  load() {
    ArtistService
    .all()
    .then(artists => this.setState({ artists: artists, loaded: true}))
    .catch(console.log);
  }

  delete(artist){
    ArtistService
    .destroy(artist.id)
    .then(()=>this.load())
    .catch(console.log);
  }

  componentDidMount = this.load;

  render() {
    const artists = this.state.artists;

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        { this.state.loaded && <>
        <div className="mt-4 w-full">
          <h3 className="text-gray-200 font-bold tracking-tight text-3xl">Artists</h3>
          { (artists.length === 0) && 
            <p className="mt-2 text-gray-200 text-lg">There are no Artists.</p>
          }
          <ul className="mt-4 mb-8 w-full flex flex-col items-start justify-start">

            { artists.map(artist => (
              <li className="flex items-center w-full py-1 px-4 py-1">
                <div className="flex items-center w-1/2">
                  <img src={artist.photo} className= "rounded-full h-10 w-10"/>
                  <p className="ml-4 text-gray-100 text-xl tracking-tight font-bold">{artist.name}</p>
                </div>
                <div className="flex items-center w-1/2">
                <button className="text-yellow-600 hover:text-yellow-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.56 1.44l9.547 9.545a1.5 1.5 0 010 2.122L3.56 22.653a1.5 1.5 0 11-2.122-2.122l8.486-8.485L1.439 3.56a1.5 1.5 0 112.122-2.122z" fill="currentColor"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.925 22.652l-9.546-9.545a1.5 1.5 0 010-2.122l9.546-9.546a1.5 1.5 0 112.12 2.122l-8.484 8.485 8.485 8.485a1.5 1.5 0 11-2.121 2.122z" fill="currentColor"/>
                    </svg>
                  </button>
                  <button className="text-red-700 hover:text-red-600 ml-4 " onClick={()=>this.delete(artist)}>
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
