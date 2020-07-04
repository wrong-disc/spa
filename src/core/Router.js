import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import "../assets/scrollbar.css";
import AuthService from '../services/AuthService';
import AuthState from '../services/AuthState';

import Sidebar from '../components/Sidebar';
import Playbar from '../components/Playbar';
import UserCard from '../components/UserCard';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import MyMusic from '../pages/music/MyMusic';
import Explore from '../pages/music/Explore';
import About from '../pages/about/About';
import Settings from '../pages/settings/Settings';
import Album from '../pages/music/Album';
import Artist from '../pages/music/Artist';
import ListArtists from '../pages/editor-panel/artists/ListArtists';
import AddAlbum from '../pages/editor-panel/albums/AddAlbum';
import AddTrack from '../pages/editor-panel/tracks/AddTrack';
import AddArtist from '../pages/editor-panel/artists/AddArtist';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthState.loggedIn === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default class RouterComponent extends React.Component {

  componentDidMount() {
    AuthService.updateAuthState()
    .then(this.updateMe);
  }

  updateMe = () => {
    this.forceUpdate();
  }

  render () {
    return (
      <Router>
        { AuthState.loggedIn !== null &&
            <div className="bg-swoosh text-gray-900 antialiased font-sans w-full h-screen flex flex-col overflow-hidden">

              <div className="flex flex-1 overflow-hidden">
                { AuthState.loggedIn === true && <Sidebar/> }

                <main className="flex-1 w-full overflow-y-auto pretty-scrollbar-thicc">
                  
                  <Switch>

                      <Route path="/login">
                          <Login updateMe={this.updateMe}/>
                      </Route>
                      <Route path="/register">
                          <Register updateMe={this.updateMe}/>
                      </Route>

                      <PrivateRoute exact path="/" component={MyMusic}/>
                      <PrivateRoute path="/explore" component={Explore}/>
                      <PrivateRoute path="/about" component={About}/>
                      <PrivateRoute path="/settings" component={Settings}/>
                      <PrivateRoute path="/album/:id" component={Album}/>
                      <PrivateRoute path="/artist/:id" component={Artist}/>
                      <PrivateRoute path="/editor/artist/add" component={AddArtist}/>   
                      <PrivateRoute path="/editor/artist" component={ListArtists}/>
                      <PrivateRoute path="/editor/album/add" component={AddAlbum}/>   
                      <PrivateRoute path="/editor/track/add" component={AddTrack}/>   
  

                                 

                  </Switch>

                </main>
              </div>

              { AuthState.loggedIn === true && <Playbar/> }

              <div className="fixed top-0 right-0 mt-6 mr-6">
                { AuthState.loggedIn === true && <UserCard updateMe={this.updateMe}/> }
              </div>

              <audio id="audio-player" className="w-full">
                <source src="#" type="audio/mpeg"/>
              </audio>

            </div>
        }
      </Router>
    );
  }
}
