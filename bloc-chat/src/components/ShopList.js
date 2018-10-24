import React, { Component } from 'react';
import Modal from 'react-modal';
import '.././styles/shoplist.css';
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

class ShopList extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			lists: [],
			newListName: '',
			modalIsOpen: false

		};
	  this.listsRef = this.props.db.database().ref('lists');
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
			newListName: e.target.value
		});
	}

	componentDidMount() {
		this.listsRef.on('child_added', snapshot => {
			const list = snapshot.val();
			list.key = snapshot.key;
	  this.setState({lists: this.state.lists.concat(list) });
		});
    
    this.listsRef.on('child_removed', snapshot =>
    {
    this.setState({lists: this.state.lists.filter( list => list.key !== snapshot.key)})
    });
  }
	

	createList(newListName) {
		this.listsRef.push({
			name: newListName
		});
		this.setState({newListName:''});
    this.closeModal();
	}

  removeList(list) {
    this.listsRef.child(list.key).remove();
  }


render() {

	return(
	  <MuiThemeProvider>
    <section className = "list-numbers">
      <section>
        <h1 id = "hero-name">List It</h1>
         <FloatingActionButton onClick={this.openModal} style={style}> <MdAdd/></FloatingActionButton>
        
      <Modal
    	    isOpen={this.state.modalIsOpen}
    	    onRequestClose={this.closeModal}
    	    style={customStyles}
    	    contentLabel="Modal"
        >
        <form className = "modal-form" onSubmit={ (e) => { e.preventDefault(); this.createList(this.state.newListName);}}>
            <h3 className = "nodal-name">New List Name: </h3>
            <div id = 'list-form'>
            <input type="text" className="new-list-form" name="newListName"  maxlength="20" value = {this.state.newListName} onChange = {this.handleChange.bind(this)}/>
            </div>
            <span id = "modal-bttn">
            <FlatButton type="submit" style={styled} label="+" />
            <FlatButton label="Close" secondary={true} onClick={this.closeModal} />
            </span>
        </form>
      </Modal>
      </section>
      <section id = "all-lists">
        <div className = "overscroll">
          {this.state.lists.map((list) =>
    	    <span key={list.key} className={ this.props.activeList && this.props.activeList.key === list.key ? 'active' : '' }>
            <span className = "add-list" onClick={ () => {this.props.setList(list)}}>{ list.name }</span>
            <span className = "remove-list" onClick={ () => this.removeList(list) } > <FatTrashO/> </span>
    	    </span>
    	    )}
        </div>
      </section>
    </section>
    </MuiThemeProvider>
   );
}
}



export default ShopList;


