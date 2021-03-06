import React from 'react';
import AuthUserService from '../../services/AuthUserService';

export default class SettingsPage extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      user: null,
      loaded: false,
      email: "",
      password: null,
    }
  }

  componentDidMount(){
    AuthUserService
      .get()
      .then((user) => this.setState({
        user: user,
        name: user.name, 
        email: user.email,
        loaded:true
      }))
      .catch(console.log);
  }

  handleName = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassword =(event) => {
    this.setState({
      password: event.target.value,
    })
  }

  save = () => {
    AuthUserService
    .update(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }
    )
    .then(() => this.props.history.push("/"))
    .catch(console.log);
  }

  render() {

    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">
        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">Settings</h1>
        {this.state.loaded && <>
          <div className="flex flex-col mt-2">
            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Name</p>
            <input type="text" placeholder="Full Name" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleName} defaultValue={this.state.user.name}/>
            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Email</p>
            <input type="email" placeholder="Email" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handleEmail} defaultValue={this.state.user.email}/>
            <p className="mt-2 ml-4 text-gray-400 tracking-tight uppercase font-bold text-sm">Password</p>
            <input type="password" className="mt-1 py-2 px-4 rounded-full focus:outline-none shadow focus:bg-gray-300" onChange={this.handlePassword} defaultValue={this.state.password}/>
          </div>
          <button className="mt-4 bg-gray-800 text-gray-200 py-2 px-8 rounded-full font-bold text-lg shadow focus:outline-none hover:bg-gray-900 active:bg-gray-700" onClick={this.save}>
            Save
          </button>
        </>}
      </div>
    );
  }
}
