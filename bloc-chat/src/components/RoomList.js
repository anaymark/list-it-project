import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import '.././styles/roomlist.css';

class RoomList extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			rooms: [],
			newRoomName: ''

		};
	    this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	handleChange(e) {
		this.setState({
			newRoomName: e.target.value
		});
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({rooms: this.state.rooms.concat(room) });
		});
	}


	createRoom(newRoomName) {
		this.roomsRef.push({
			name: newRoomName
		});
		this.setState({newRoomName:''});
	}
	


render() {

	return(
	<Row className = "chat-rooms">	
    <Col md={4} className = "room-holder">
    <section className = "room-numbers">
    <h1 className = "hero-name">Bloc Chat</h1>
    <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) }}>
       
        <input type="text" name="newRoomName"  value = {this.state.newRoomName} onChange = {this.handleChange.bind(this)}/>
       
        <input type="submit" value="+" />
    </form>
    {this.state.rooms.map((room, key) =>
    	<div key={room.key}>
    	<span className = "rooms-avail">{room.name}</span>
    	</div>
    	)}
    </section>
    </Col>
    </Row>
   );
}
}



export default RoomList;


