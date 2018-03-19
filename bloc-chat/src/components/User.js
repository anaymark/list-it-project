import React, { Component } from 'react';

class User extends Component {

	constructor(props){
		super(props);

	    this.signInWithPopup = this.signInWithPopup.bind(this);
     }
    
    
    signInWithPopup(){
      var provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup(provider);
    }

    componentDidMount(){
      this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      });
    }

	render() {
		
		return(
			<section>
			  <button onClick = {this.signInWithPopup}> +
			  </button>
			  <span>{this.props.user.displayName}
			  </span>
			</section>		
			)
	}
}

export default User;