import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SessionPage extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	constructor(props){
		super(props);

		const SESSION_LENGTH = 25 * 60; // in seconds

		this.state = {
			time_remaining: SESSION_LENGTH, 
			mind_wanders: [],
			distractions: []
		};

		this._endSession = this._endSession.bind(this);
	}

	componentDidMount(){
		this.timer = setInterval(() => {
			this.setState({time_remaining: this.state.time_remaining - 1}, () => {
				if(this.state.timeRemaining == 0)
					this._endSession();
			});
		}, 1000);
		this.props.setSessionData('start_time', Date.now());
	}

	render(){
		return (
			<div>
				<div>This is the session page</div>
				<div>{this._timerString()}</div>
				<div onClick={ () => { this._recordMindWander() }}>Mind Wander</div>
				<div onClick={ () => { this._recordDistraction() }}>Distraction</div>
				<div onClick={ () => { this._skipToEndTask() }}>skip to end of task</div>
			</div>
		);
	}

	_recordMindWander(){
		let current_time = Date.now();
		this.setState({ mind_wanders: [...this.state.mind_wanders, current_time] });
	}

	_recordDistraction(){
		let current_time = Date.now();
		this.setState({ distractions: [...this.state.distractions, current_time] });
	}

	_timerString(){
		let minutes = Math.floor(this.state.time_remaining / 60);
		let seconds = this.state.time_remaining % 60;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return `${minutes}:${seconds}`;
	}

	_endSession(){
		this.props.setSessionData('end_time', Date.now());
		this.props.setSessionData('mind_wanders', this.state.mind_wanders);
		this.props.setSessionData('distractions', this.state.distractions);
		clearInterval(this.timer);
		new Notification('Your session is finished! Please fill out your results so we can help you improve.');
		this.context.router.push('/end');
	}

	_skipToEndTask(){
		this.props.setSessionData('end_time', Date.now());
		this.props.setSessionData('mind_wanders', this.state.mind_wanders);
		this.props.setSessionData('distractions', this.state.distractions);
		clearInterval(this.timer);
		this.context.router.push('/end');
	}
}