import React, { Component } from 'react';
import { Link } from 'react-router';


const style = {
	button: {
		backgroundColor: 'rgb(116, 196, 173)',
		color: 'rgb(56, 58, 59)',
		fontSize: '24px',
		padding: '15px 25px',
		borderRadius: '50px',
		marginTop: '45%'
	},
	buttonContainer: {
		marginTop: '30vh'
	}
};

export default class SessionDash extends Component {
	constructor(props){
		super(props);

		this.state = {};
	}

	componentDidMount(){ Notification.requestPermission(); }

	render(){
		return (
			<div style={style.buttonContainer}>
				<Link style={style.button} to='/session'>Start a session</Link>
			</div>
		);
	}
}