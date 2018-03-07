import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'

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
      
    };
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}>
        </RoomList>
      </div>
    );
  }
}

export default App;
