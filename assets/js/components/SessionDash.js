import React, { Component } from 'react';
import { Link } from 'react-router';


export default class SessionDash extends Component {
	constructor(props){
		super(props);

		this.state = {};
	}

	componentDidMount(){ Notification.requestPermission(); }

	render(){
		return (
			<div>
				<div>{this.props.flash_message}</div>
				<div>This is the session dashboard</div>
				<Link to='/session'>Start a session</Link>
			</div>
		);
	}
}