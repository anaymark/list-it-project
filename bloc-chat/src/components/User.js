import React, { Component } from 'react';
import '.././styles/user.css';


class User extends Component {

	constructor(props){
		super(props);

        this.signOut = this.signOut.bind(this);
	    this.signInWithPopup = this.signInWithPopup.bind(this);
	    this.userRef = this.props.firebase.database().ref('user');
     }
    
    
    signInWithPopup(){
      var provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup(provider).then(result=>
       {
      	var userID = result.user.uid;
        var photoURL = result.user.photoURL;
        var email = result.user.email;
        var userName = result.user.displayName;
        this.userRef.push({
        	userId: userID,
        	photoURL: photoURL,
        	email: email,
        	userName: userName
        })
      })
    }

    signOut(){
    
    	this.props.firebase.auth().signOut().then(()=>{
    		this.props.setUser(null);
    	});
    }

    componentDidMount(){
        this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });
    }


	render() {
		
		return(
			<section>
			  <button className = "user-LogIn" onClick = {this.signInWithPopup}> Sign-In
			  </button>
			  <button className = "user-LogOut" onClick = {this.signOut}> Log-Out
			  </button>
			  {this.props.user ? 
			  (<span> User: {this.props.user.displayName }
         <img className = "user-image" src= {this.props.user.photoURL} alt="user" /> 
			  </span>
			  ) : 
			  <span>
			  User: Guest
			  </span> }
			</section>		
			)
	}
}

export default User;