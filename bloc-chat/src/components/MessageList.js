import React, { Component } from 'react';
import '.././styles/messagelist.css';
import Moment from 'react-moment';




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
	   this.setState({ messages: this.state.allMessages.filter( message => message.roomId === activeRoom.key )}, () => this.scrollToBottom()  );
	 }
     

	deleteMessage(room) {
	   this.messagesRef.child(room.key).remove();
	}

	scrollToBottom = () => {
     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

	componentDidMount () {
       this.messagesRef.on('child_added', snapshot  => {
       let message = Object.assign(snapshot.val(), {key: snapshot.key})
       this.setState({ allMessages: this.state.allMessages.concat( message ) }, () => {
       this.displayMessage( this.props.activeRoom ),   this.scrollToBottom();
      });
     });
       this.messagesRef.on('child_removed', snapshot => {
       this.setState({allMessages: this.state.allMessages.filter(message => message.key !== snapshot.key)},() => {
       this.displayMessage( this.props.activeRoom )

         });
       }); 
       () => this.scrollToBottom() 
    }

	newMessage(message) {
	   if(!this.props.activeRoom || !message){return}
       this.messagesRef.push({
       content: this.state.message,
       timeStamp: Date(Date.now()),
       roomId: this.props.activeRoom.key,
       userId: !this.props.user ? 'Guest' : this.props.user.uid,
       userName: !this.props.user ? 'Guest' : this.props.user.displayName
       });
       this.setState({message: ''});
}


	render(){
		return(
			
			<section>
			<div className = 'messages'>
			  <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
			  {this.props.activeRoom  ? (
			  <ul className="active-messages">
			    {this.state.messages.map(message =>
				<li className ="full-message" key={message.key} > 
				  <div className = "message-content-1"> Message: {message.content} </div> <button onClick={ () => this.deleteMessage(message) } className="remove">x</button>
				  <div className = "message-content-2"> User: {message.userName}</div>
				  <div> AT:{message.timeStamp} </div>
				</li>
                )}
              </ul>
			  ) : ""}
			  {this.props.activeRoom ? (
			  <section className="submit-form">
		        <form onSubmit = { (e) => {e.preventDefault(); this.newMessage(this.state.message) } }>
		    	  <input className = "submit-form" type = "text" value = {this.state.message} onChange = {this.handleChange.bind(this)}/>
		    	  <input className = "submit-button" type = "submit" />
		        </form>
              </section>
              ) : ""}
             <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
             </div>
            </div>
            </section>
		    )
	}
}


export default MessageList;