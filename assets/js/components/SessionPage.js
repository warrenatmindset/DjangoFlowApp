import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/sessionButtons.css';


const style = {
	interfaceContainer: {
		marginTop: '20vh',
		textAlign: 'center'
	},
	timer: {
		fontSize: '64px',
		textAlign: 'center',
		minWidth: '300px'
	}
};

export default class SessionPage extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	constructor(props){
		super(props);

		this.SESSION_LENGTH = 25 * 60; // in seconds

		this.state = {
			time_remaining: this.SESSION_LENGTH, 
			mind_wanders: [],
			distractions: [],
			timer_ongoing: false,
			session_begun: false
		};

		this._endSession = this._endSession.bind(this);
	}

	render(){
		return (
			<div style={style.interfaceContainer}>
				<div className={this._beginButtonClassName()} onClick={() => { this._beginSession(); }}>Begin</div>
				<div className={this._pauseAndResetButtonClassNames()} onClick={() => { this._pauseOrResumeSession(); }}>{this._pauseOrResumeString()}</div>
				<div className={this._pauseAndResetButtonClassNames()} onClick={() => { this._resetSession(); }}>Reset</div>
				<div style={style.timer} className='session-timer'>{this._timerString()}</div>
				<div className='session-button' onClick={ () => { this._recordMindWander() }}>Mind Wander</div>
				<div className='session-button' onClick={ () => { this._recordDistraction() }}>Distraction</div>
				<div onClick={ () => { this._skipToEnd(); }}>Skip to end</div>
			</div>
		);
	}

	_beginSession(){
		if (!this.state.timer_ongoing){
			this.props.setSessionData('start_time', Date.now());
			this._startTimer();
		}
	}

	_resetSession(){
		this.setState({
			time_remaining: this.SESSION_LENGTH,
			timer_ongoing: false,
			session_begun: false
		});
		clearInterval(this.timer);
	}

	_pauseOrResumeSession(){
		if (this.state.session_begun){
			if (!this.state.timer_ongoing){
				this._startTimer();
			} else {
				this._stopTimer();
			}
		}
	}

	_recordMindWander(){
		let current_time = Date.now();
		this.setState({ mind_wanders: [...this.state.mind_wanders, current_time] });
	}

	_recordDistraction(){
		let current_time = Date.now();
		this.setState({ distractions: [...this.state.distractions, current_time] });
	}


	_startTimer(){
		this.setState({
			timer_ongoing: true,
			session_begun: true
		});
		this.timer = setInterval(() => {
			this.setState({time_remaining: this.state.time_remaining - 1}, () => {
				if(this.state.time_remaining == 0)
					this._endSession();
			});
		}, 1000);
	}

	_stopTimer(){
		clearInterval(this.timer);
		this.setState({timer_ongoing: false});
	}

	_beginButtonClassName(){
		if (!this.state.session_begun){
			return 'session-button';
		} else {
			return 'disabled-session-button';
		}
	}

	_pauseAndResetButtonClassNames(){
		if (this.state.session_begun){
			return 'session-button';
		} else {
			return 'disabled-session-button';
		}
	}

	_pauseOrResumeString(){
		return this.state.timer_ongoing ? 'Pause' : 'Resume';
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
		this._stopTimer();
		this._sendNotification();
		this.context.router.push('/end');
	}

	_sendNotification(){
		let n = new Notification('Session finished!', {
			icon: '/static/images/logobadge.png',
			body: 'Sit back & relax'
		});
		n.onclick = () => {	window.focus(); };
		// let s = new Audio('./sound_clips/beep.mp3');
		// s.play();
	}

	_skipToEnd(){
		this.context.router.push('/end');
	}
}