import React, { Component } from 'react';
import '.././styles/itemlist.css';
import FatTrashO from 'react-icons/lib/fa/trash-o';
import FlatButton from 'material-ui/FlatButton';
import MdSend from 'react-icons/lib/md/send';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
	marginLeft: 1.125,
}


class ItemList extends Component {

	constructor(props){
		super(props);
		this.state = {
			
            allItems: [], items: [], item: ''

		}

	    this.itemsRef = this.props.db.database().ref('items');
	}

	handleChange(e) {
	   this.setState({item: e.target.value});
	}
	
//compare nextProps and current props
    componentWillReceiveProps(nextProps) {
       this.displayItem( nextProps.activeList );
    }

    
    displayItem(activeList) {
       
	   if(!activeList) { return }
	   this.setState({ items: this.state.allItems.filter( item => item.listId === activeList.key )} );
	 }
     

	deleteItem(list) {
	   this.itemsRef.child(list.key).remove();
	}


	componentDidMount () {
       this.itemsRef.on('child_added', snapshot  => {
       let item = Object.assign(snapshot.val(), {key: snapshot.key})
       this.setState({ allItems: this.state.allItems.concat( item ) }, () => {
       this.displayItem( this.props.activeList );   
      });
     });
       this.itemsRef.on('child_removed', snapshot => {
       this.setState({allItems: this.state.allItems.filter(item => item.key !== snapshot.key)},() => {
       this.displayItem( this.props.activeList )

         });
       }); 
    }

	newItem(item) {
	   if(!this.props.activeList || !item){return}
       this.itemsRef.push({
       content: this.state.item,
       timeStamp: Date(Date.now()),
       listId: this.props.activeList.key,
       userId: !this.props.user ? 'Guest' : this.props.user.uid,
       userName: !this.props.user ? 'Guest' : this.props.user.displayName
       });
       this.setState({item: ''});
}


	render(){
		return(
			<MuiThemeProvider>
			<section id="all-items">
			<div id = "items">
			  <h2 className="list-name">{ this.props.activeList ? this.props.activeList.name : '' }</h2>
			  {this.props.activeList  ? (
			 
			  <ul className="active-items">
			    {this.state.items.map(item =>
				<li className ="full-item" key={item.key} > 
				  <div className = "item-content-1"> Item: {item.content} <span onClick={ () => this.deleteItem(item) } className="remove"><FatTrashO className = "trash"/></span></div> 
				  <div className = "meta-item">
				  <div className = "item-content-2"> User: {item.userName}</div>
				  <div className = "item-content-3"> {item.timeStamp} </div>
				  </div>
				</li>
                )}
              </ul>
			  
			  ) : ""}
			  {this.props.activeList ? (
			  <section className="submit-form">
		        <form onSubmit = { (e) => {e.preventDefault(); this.newItem(this.state.item) } }>
		    	  <input className = "submit-form" maxlength="120" type = "text" value = {this.state.item} onChange = {this.handleChange.bind(this)}/>
		    	  <FlatButton type = "submit" style={style}>
		    	  <MdSend className = "white-button"/>
		    	  </FlatButton>
		        </form>
              </section>
              ) : ""}
             </div>
            </section>
            </MuiThemeProvider>
		    )
	}
}


export default ItemList;