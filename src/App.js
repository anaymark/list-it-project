import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import ShopList from './components/ShopList';
import ItemList from './components/ItemList';
import User from './components/User';

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
      activeList: null,
      user: [],
      currentList: '',
      activeUser:null
    };
  }

  listChange(activeList) {
    this.setState({currentList: activeList.name});
  }

  setUser(user) {
    this.setState({user: user});
  }

  setList(list) {
    this.setState({activeList:list});
  }
 

  render() {
    return (
      <div className="App">
        <section id = "pannel">
        <ShopList id = "list-list" db={firebase} activeList={this.state.activeList} setList={this.setList.bind(this)}>
        </ShopList>
        <section id = "user-pannel">
        <User  firebase = {firebase} setUser = {this.setUser.bind(this)} user={this.state.user}>
        </User>
        </section>
        </section>
        <section id = "item-container">
        <ItemList db={firebase} activeList={this.state.activeList} user={this.state.user}>
        </ItemList>
        </section>
      </div>
    );
  }
}

export default App;
