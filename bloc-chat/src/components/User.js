import React, { Component } from 'react';
import '.././styles/user.css';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FaSignIn from 'react-icons/lib/fa/sign-in';
import FaSignOut from 'react-icons/lib/fa/sign-out';


const style = {
  margin: 3,
  fullWidth:false,
  width: 40,
  height: 40,
};



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
      <MuiThemeProvider>
			<section className = "user-nav">
        <section className = "buttons">
			  <RaisedButton onClick = {this.signInWithPopup} primary={true} style={style} >
        <FaSignIn className = "sign-bttn"/>
        </RaisedButton>
        <RaisedButton onClick = {this.signOut} secondary={true} style={style} >
        <FaSignOut className = "sign-bttn"/>
        </RaisedButton>
        </section>
			 
			  
			  {this.props.user ? 
			  (<span>
         <span className = "user-name"> User: {this.props.user.displayName }</span>
         <img className = "user-image" src= {this.props.user.photoURL} alt="user" /> 
			   </span>
			  ) : 
			  <span>
			  User: Guest
			  </span> }
			</section>		
      </MuiThemeProvider>
			)
	}
}

export default User;