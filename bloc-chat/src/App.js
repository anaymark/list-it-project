import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCy8xYxSUwi8Q-ZbwjRG2uusduFGFfbymA",
    authDomain: "bloc-chat-2e993.firebaseapp.com",
    databaseURL: "https://bloc-chat-2e993.firebaseio.com",
    projectId: "bloc-chat-2e993",
    storageBucket: "bloc-chat-2e993.appspot.com",
    messagingSenderId: "703568849779"
  };
  firebase.initializeApp(config);

class App extends Component {
   
   constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: ''
    };
  }


  setUser(user) {
    this.setState({user: user});
  }

  setRoom(room) {
    this.setState({activeRoom:room});
  }

  render() {
    return (
      <div className="App">
        <RoomList db={firebase} activeRoom={this.state.activeRoom} setRoom={this.setRoom.bind(this)}>
        </RoomList>
        <MessageList db={firebase} activeRoom={this.state.activeRoom} setRoom={this.setRoom.bind(this)}>
        </MessageList>
      </div>
    );
  }
}

export default App;
