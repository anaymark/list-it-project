import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import '.././styles/roomlist.css';

class RoomList extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			rooms: []
		};
	    this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({rooms: this.state.rooms.concat(room) });
		});
	}



render() {

	return(
	<Row className = "chat-rooms">	
    <Col md={4} className = "room-holder">
    <section className = "room-numbers">
    <h1 className = "hero-name">Bloc Chat</h1>
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


