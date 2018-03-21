import React, { Component } from 'react';
import Modal from 'react-modal';
import '.././styles/roomlist.css';
import FatTrashO from 'react-icons/lib/fa/trash-o';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MdAdd from 'react-icons/lib/md/add';
import FlatButton from 'material-ui/FlatButton';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0',
  }
};

const style = {
  marginLeft: 10,
};

const styled = {
  marginTop:4,
  marginBottom:4,
  fontSize:1.5

};

Modal.setAppElement(document.getElementById('root'));

class RoomList extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			rooms: [],
			newRoomName: '',
			modalIsOpen: false

		};
	  this.roomsRef = this.props.db.database().ref('rooms');
	  this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}



	openModal() {
    this.setState({modalIsOpen: true});
    }


  closeModal() {
    this.setState({modalIsOpen: false});
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
    
    this.roomsRef.on('child_removed', snapshot =>
    {
    this.setState({rooms: this.state.rooms.filter( room => room.key !== snapshot.key)})
    });
  }
	

	createRoom(newRoomName) {
		this.roomsRef.push({
			name: newRoomName
		});
		this.setState({newRoomName:''});
    this.closeModal();
	}

  removeRoom(room) {
    this.roomsRef.child(room.key).remove();
  }


render() {

	return(
	  <MuiThemeProvider>
    <section className = "room-numbers">
      <section>
        <h1 id = "hero-name">Bloc Chat</h1>
         <FloatingActionButton onClick={this.openModal} style={style}> <MdAdd/></FloatingActionButton>
        
      <Modal
    	    isOpen={this.state.modalIsOpen}
    	    onRequestClose={this.closeModal}
    	    style={customStyles}
    	    contentLabel="Modal"
        >
        <form className = "modal-form" onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName);}}>
            <h3 className = "nodal-name">New Room Name: </h3>
            <div id = 'room-form'>
            <input type="text" className="new-room-form" name="newRoomName"  maxlength="20" value = {this.state.newRoomName} onChange = {this.handleChange.bind(this)}/>
            </div>
            <span id = "modal-bttn">
            <FlatButton type="submit" style={styled} label="+" />
            <FlatButton label="Close" secondary={true} onClick={this.closeModal} />
            </span>
        </form>
      </Modal>
      </section>
      <section id = "all-rooms">
        <div className = "overscroll">
          {this.state.rooms.map((room) =>
    	    <span key={room.key} className={ this.props.activeRoom && this.props.activeRoom.key === room.key ? 'active' : '' }>
            <span className = "add-room" onClick={ () => {this.props.setRoom(room)}}>{ room.name }</span>
            <span className = "remove-room" onClick={ () => this.removeRoom(room) } > <FatTrashO/> </span>
    	    </span>
    	    )}
        </div>
      </section>
    </section>
    </MuiThemeProvider>
   );
}
}



export default RoomList;


