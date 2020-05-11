import React from 'react';
import {NavLink} from 'react-router-dom';

import '../assets/scrollbar.css';
import SearchService from '../services/SearchService';
import StreamService from '../services/StreamService';

export default class SidebarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            results: {
                tracks: [],
                albums: [],
                artists: []
            },
            loaded: false,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    handleSearch(event) {
        let query = event.target.value;
        this.setState({search: query});

        SearchService
        .search(query)
        .then(results => this.setState({ results: results, loaded: true }))
        .catch(console.log);

    }

    clearSearch() {
        this.setState({search: ""});
    }

    play(track) {
        StreamService
        .load(track)
        .then(() => {
            StreamService
            .play();
        })
    }

    render() {
        return (
            <div className="flex border-gray-900 border-r shadow-lg">
                <nav className="bg-gray-800 w-80 px-4 flex flex-col text-gray-200 items-center">

                    <div className="text-gray-700">
                        <NavLink exact={true} activeClassName="text-gray-400" to="/about">
                            <svg className="w-40 mt-4" viewBox="0 0 350 350" fill="none" ><circle cx="175" cy="139" r="74" fill="#1A202C" stroke="#000" strokeWidth="2"/><circle cx="174.5" cy="139.5" r="64" stroke="#000"/><circle cx="174.5" cy="139.5" r="54" stroke="#000"/><circle cx="174.5" cy="139.5" r="45" stroke="#000"/><circle cx="174.5" cy="139.5" r="36" stroke="#000"/><circle cx="174.5" cy="139.5" r="26.5" fill="#ED8936" stroke="#000" strokeWidth="6"/><circle cx="175" cy="139" r="3" fill="#C4C4C4"/><path fillRule="evenodd" clipRule="evenodd" d="M267.349 66.983l64.674 64.815c3.969 3.978 3.969 10.426 0 14.404l-64.674 64.815a10.148 10.148 0 01-14.372 0c-3.969-3.977-3.969-10.426 0-14.403L310.465 139l-57.488-57.614c-3.969-3.977-3.969-10.426 0-14.403a10.147 10.147 0 0114.372 0zM82.651 208.017l-64.674-64.815c-3.97-3.978-3.97-10.426 0-14.404L82.65 63.983a10.147 10.147 0 0114.372 0c3.969 3.977 3.969 10.426 0 14.403L39.535 136l57.488 57.614c3.969 3.977 3.969 10.426 0 14.403a10.148 10.148 0 01-14.372 0z" fill="currentColor"/><path d="M50.181 276h7.193l6.631-22.824h.273L70.925 276h7.194l9.988-34.909h-8.062l-5.779 24.307h-.306l-6.358-24.307h-6.904l-6.375 24.256h-.29l-5.778-24.256h-8.063L50.183 276zM90.28 276h7.262v-14.813c0-3.221 2.352-5.437 5.557-5.437 1.005 0 2.386.17 3.068.392v-6.443a10.86 10.86 0 00-2.284-.256c-2.932 0-5.335 1.705-6.29 4.943h-.273v-4.568h-7.04V276zM120.532 276.511c7.943 0 12.886-5.437 12.886-13.5 0-8.113-4.943-13.534-12.886-13.534s-12.886 5.421-12.886 13.534c0 8.063 4.943 13.5 12.886 13.5zm.034-5.625c-3.665 0-5.54-3.358-5.54-7.926s1.875-7.943 5.54-7.943c3.597 0 5.472 3.375 5.472 7.943s-1.875 7.926-5.472 7.926zM145.401 260.864c.017-3.375 2.029-5.353 4.961-5.353 2.914 0 4.67 1.909 4.653 5.114V276h7.261v-16.67c0-6.103-3.579-9.853-9.034-9.853-3.886 0-6.699 1.909-7.875 4.96h-.307v-4.619h-6.92V276h7.261v-15.136zM179.795 286.193c7.483 0 12.801-3.409 12.801-9.937v-26.438h-7.21v4.398h-.273c-.972-2.131-3.102-4.739-7.483-4.739-5.744 0-10.602 4.466-10.602 13.381 0 8.71 4.721 12.767 10.619 12.767 4.176 0 6.511-2.097 7.466-4.261h.307v4.789c0 3.427-2.301 4.824-5.455 4.824-3.204 0-4.824-1.397-5.42-2.812l-6.716.903c.869 3.955 4.909 7.125 11.966 7.125zm.153-16.023c-3.562 0-5.506-2.829-5.506-7.346 0-4.449 1.91-7.568 5.506-7.568 3.529 0 5.506 2.983 5.506 7.568 0 4.619-2.012 7.346-5.506 7.346zM221.995 276c10.636 0 17.08-6.58 17.08-17.489 0-10.875-6.444-17.42-16.978-17.42H209.62V276h12.375zm-4.994-6.324v-22.261h4.704c6.546 0 10.006 3.341 10.006 11.096 0 7.79-3.46 11.165-10.023 11.165h-4.687zM244.406 276h7.261v-26.182h-7.261V276zm3.647-29.557c2.165 0 3.938-1.653 3.938-3.682 0-2.011-1.773-3.664-3.938-3.664-2.147 0-3.92 1.653-3.92 3.664 0 2.029 1.773 3.682 3.92 3.682zM279.268 257.284c-.648-4.824-4.534-7.807-11.148-7.807-6.699 0-11.114 3.103-11.097 8.148-.017 3.92 2.455 6.46 7.569 7.483l4.534.903c2.284.461 3.324 1.296 3.358 2.608-.034 1.551-1.722 2.659-4.262 2.659-2.591 0-4.312-1.108-4.755-3.238l-7.142.375c.681 5.011 4.943 8.096 11.88 8.096 6.784 0 11.642-3.46 11.659-8.625-.017-3.784-2.488-6.051-7.568-7.091l-4.738-.954c-2.438-.529-3.341-1.364-3.324-2.625-.017-1.568 1.755-2.591 4.005-2.591 2.523 0 4.023 1.381 4.381 3.068l6.648-.409zM296.266 276.511c6.972 0 11.353-4.091 11.694-10.108h-6.853c-.426 2.796-2.267 4.364-4.755 4.364-3.392 0-5.591-2.847-5.591-7.858 0-4.943 2.216-7.773 5.591-7.773 2.659 0 4.363 1.756 4.755 4.364h6.853c-.307-6.051-4.893-10.023-11.728-10.023-7.943 0-12.852 5.506-12.852 13.534 0 7.961 4.824 13.5 12.886 13.5z" fill="#EDF2F7"/></svg>
                        </NavLink>
                    </div>

                    <div className="relative flex items-center">
                        <input onChange={this.handleSearch} value={this.state.search} className="w-full h-6 bg-gray-900 rounded-full pl-8 pr-3 pb-05 text-sm focus:outline-none focus:bg-gray-700" placeholder="Search" type="text"/>
                        <svg className="absolute top-0 left-0 ml-2 mt-1 text-gray-400 w-4 h-4" viewBox="0 0 24 24" fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M9.66 3.689c-3.342 0-5.971 2.553-5.971 5.607 0 3.054 2.629 5.607 5.97 5.607 3.342 0 5.971-2.553 5.971-5.607 0-3.054-2.629-5.607-5.97-5.607zM2 9.296C2 5.224 5.473 2 9.66 2c4.185 0 7.659 3.224 7.659 7.296 0 1.801-.68 3.436-1.8 4.7L22 20.13l-1.16 1.226-6.58-6.228a7.895 7.895 0 01-4.6 1.463C5.472 16.592 2 13.37 2 9.296z" fill="currentColor"/></svg>
                    </div>

                    <div className="mt-8 w-full text-gray-600">
                        <NavLink exact={true} activeClassName="text-gray-100" to="/">
                            <div className="mx-4 border-b border-gray-700 py-2 font-bold text-lg">My Music</div>
                        </NavLink>
                        <NavLink exact={true} activeClassName="text-gray-100" to="/explore">
                            <div className="mx-4 py-2 font-bold text-lg ">Explore</div>
                        </NavLink>
                    </div>
                </nav>

                { this.state.search &&
                    <div className="bg-gray-900 px-8 py-4 text-gray-300 flex flex-col items-center overflow-y-auto pretty-scrollbar relative">

                        <button onClick={this.clearSearch} className="absolute top-0 right-0 mt-2 mr-2 text-gray-800 hover:text-gray-700">
                            <svg viewBox="0 0 352 512" className="h-6 w-6">
                                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                            </svg>
                        </button>

                        <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-400 border-gray-500 border-b">Search Results</h3>

                        {
                            this.state.results.tracks.length === 0 &&
                            this.state.results.albums.length === 0 &&
                            this.state.results.artists.length === 0 &&
                            <p className="text-gray-300 mt-4">No results found.</p>
                        }

                        { this.state.results.tracks.length > 0 &&
                        <div className="w-full mt-4 pt-4 pb-8 border-gray-800 border-b">
                            <h4 className="text-center text-gray-500 text-sm font-bold tracking-tight">Songs</h4>
                            <ul className="w-full mt-4">
                                { this.state.loaded && this.state.results.tracks.map((track, k) => (
                                    <li className="flex items-center my-4">
                                        <button onClick={() => this.play(track)} className="relative group">
                                            <img className="shadow-lg rounded-lg h-16 w-16" alt="Album cover" src={track.album.cover} />
                                            <div className="invisible group-hover:visible absolute top-0 left-0 w-full h-full rounded-lg text-gray-300 flex items-center justify-center bg-black opacity-50">
                                                <svg viewBox="0 0 448 512" className="w-8 h-8">
                                                    <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
                                                </svg>
                                            </div>
                                        </button>
                                        <div className="ml-4">
                                            <p className="font-bold text-lg">{track.title}</p>
                                            <NavLink to={"/artist/" + track.artist.id}>
                                                <p className="text-sm">{track.artist.name}</p>
                                            </NavLink>
                                            <NavLink to={"/album/" + track.album.id}>
                                                <p className="text-xs text-gray-600">{track.album.title}</p>
                                            </NavLink>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        }

                        { this.state.results.albums.length > 0 &&
                            <div className="w-full mt-2 pt-4 pb-8 border-gray-800 border-b">
                                <h4 className="text-center text-gray-500 text-sm font-bold tracking-tight">Albums</h4>
                                <ul className="w-full mt-4">
                                    { this.state.loaded && this.state.results.albums.map((album, k) => (
                                        <li key={"search-album-" + album.id}>
                                            <NavLink exact={true} className="flex items-center my-4" to={"/album/" + album.id}>
                                                <img className="shadow-lg rounded-lg h-16 w-16" alt="Album cover" src={album.cover} />
                                                <div className="ml-4">
                                                    <p className="font-bold text-lg">{album.title}</p>
                                                    <NavLink to={"/artist/" + album.artist.id}>
                                                        <p className="text-sm">{album.artist.name}</p>
                                                    </NavLink>
                                                </div>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }

                        { this.state.results.artists.length > 0 &&
                            <div className="w-full mt-2 pt-4 pb-8">
                                <h4 className="text-center text-gray-500 text-sm font-bold tracking-tight">Artists</h4>
                                <ul className="w-full mt-2">
                                    { this.state.loaded && this.state.results.artists.map((artist, k) => (
                                        <li key={"search-artist-" + artist.id}>
                                            <NavLink exact={true} className="flex items-center my-2" to={"/artist/" + artist.id}>
                                                <img className="shadow-lg rounded-full h-16 w-16" alt="Album cover" src={artist.photo} />
                                                <div className="ml-4">
                                                    <p className="font-bold text-lg">{artist.name}</p>
                                                </div>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }

                    </div>
                }
            </div>
        );
    }

}
