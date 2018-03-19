import React, { Component } from 'react';
import '.././styles/messagelist.css';



class MessageList extends Component {

	constructor(props){
		super(props);
		this.state = {
			
            allMessages: [], messages: [], message: ''

		}

	    this.messagesRef = this.props.db.database().ref('messages');
	}

	handleChange(e) {
	   this.setState({message: e.target.value});
	}
	
//compare nextProps and current props
    componentWillReceiveProps(nextProps) {
       this.displayMessage( nextProps.activeRoom );
    }

    
    displayMessage(activeRoom) {
     
	   if(!activeRoom) { return }
	   this.setState({ messages: this.state.allMessages.filter( message => message.roomId === activeRoom.key ) } );
	 }
     

	deleteMessage(room) {
	   this.messagesRef.child(room.key).remove();
	}

	componentDidMount () {
       this.messagesRef.on('child_added', snapshot  => {
       let message = Object.assign(snapshot.val(), {key: snapshot.key})
       this.setState({ allMessages: this.state.allMessages.concat( message ) }, () => {
       this.displayMessage( this.props.activeRoom )
      });
     });
       this.messagesRef.on('child_removed', snapshot => {
       this.setState({allMessages: this.state.allMessages.filter(message => message.key !== snapshot.key)},() => {
       this.displayMessage( this.props.activeRoom )
         });
       });  
    }

	newMessage(message) {
	   if( !this.props.activeRoom || !message){return}
	   this.messagesRef.push({
	   	content: this.state.message,
	   	timeStamp: Date.now(),
	   	roomId: this.props.activeRoom.key
	   });
	   this.setState({message: ''});
	}


	render(){
		return(
			
			<div className = 'messages'>
			  <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
			  {this.props.activeRoom  ? (
			  <ul className="active-messages">
			    {this.state.messages.map(message =>
				<li key={message.key} > 
				  <div> {message.author} </div>
				  <div> {message.content} </div>
				  <button onClick={ () => this.deleteMessage(message) } className="remove remove-message-button">&times;</button>
				  <div> {message.timeStamp} </div>
				</li>
                )}
              </ul>
			  ) : ""}
			  {this.props.activeRoom ? (
			  <section className="active-messages">
		        <form onSubmit = { (e) => {e.preventDefault(); this.newMessage(this.state.message) } }>
		    	  <input type = "text" value = {this.state.message} onChange = {this.handleChange.bind(this)}/>
		    	  <input type = "submit" />
		        </form>
              </section>
              ) : ""}
            </div>
		    )
	}
}


export default MessageList;