import React, { Component } from 'react';

class MessageList extends Component {

	constructor(props){
		super(props);
		this.state = {
			messages: [],
			message: ''

		}

	    this.messagesRef = this.props.db.database().ref('messages');
	}

	

    ComponentWillReceiveProps(nextProps) {
       this.messages( nextProps.activeRoom );
    }

	componentDidMount () {
       this.messagesRef.on('child_added', snapshot  => {
       let message = Object.assign(snapshot.val(), {key: snapshot.key})
       this.setState({ messages: this.state.messages.concat( message ) }, () => {
       this.displayMessage( this.props.activeRoom )
      });
     });
    }

    displayMessage(activeRoom) {
	   if(!activeRoom) {return}
	   this.setState({messages: this.state.messages.filter( message => message.roomId === activeRoom.key ) } , () => {
       this.updateDisplayedMessages( this.props.activeRoom ) });
	}


	render(){
		return(
			<div>
			<h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
			{this.props.activeRoom ? (
			<ul>
			{this.state.messages.map(message =>
				<li key={message.key}> 
				 <div> {message.author} </div>
				  <div> {message.content} </div>
				  <div> {message.timeStamp} </div>
				</li>
				)}
			</ul>
			) : ""}
		    </div>
			)
	}
}




export default MessageList;