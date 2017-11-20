import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/sessionButtons.css';


const style = {
	interfaceContainer: {
		marginTop: '20vh',
		textAlign: 'center'
	},
	todo_container: {
		height: '250px',
		padding: '10px',
		display: 'inline-block',
		border: '1px solid rgb(56, 58, 59)',
		borderRight: '1px dotted rgb(56, 58, 59)',
		verticalAlign: 'top',
		textAlign: 'left'
	},
	todo_header: {
		fontSize: '160%',
		cursor: 'default',
		userSelect: 'none'
	},
	todo_list: {
		height: '200px',
		padding: '0 20px',
		overflow: 'scroll',
		userSelect: 'none'
	},
	incomplete_todo: {
		display: 'inline-block',
		width: '150px',
		cursor: 'default',
		userSelect: 'none'
	},
	complete_todo: {
		display: 'inline-block',
		width: '150px',
		textDecoration: 'line-through',
		cursor: 'default',
		userSelect: 'none'
	},
	control_container: {
		height: '250px',
		padding: '10px',
		display: 'inline-block',
		border: '1px solid rgb(56, 58, 59)',
		borderLeft: 'none',
		verticalAlign: 'top'
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
			returns_to_work: [],
			timer_ongoing: false,
			session_begun: false
		};

		this._endSession = this._endSession.bind(this);
	}

	render(){
		return (
			<div style={style.interfaceContainer}>
				<section style={style.todo_container}>
					<header style={style.todo_header}>Session To-Dos:</header>
					<ul style={style.todo_list}>
						{this._toDos()}
					</ul>
				</section>
				<section style={style.control_container}>
					<div className={this._beginButtonClassName()} onClick={() => { this._beginSession(); }}>Begin</div>
					<div className={this._pauseAndResetButtonClassNames()} onClick={() => { this._pauseOrResumeSession(); }}>{this._pauseOrResumeString()}</div>
					<div className={this._pauseAndResetButtonClassNames()} onClick={() => { this._resetSession(); }}>Reset</div>
					<div style={style.timer} className='session-timer'>{this._timerString()}</div>
					<div className='session-button' onClick={ () => { this._recordReturnToWork() }}>Return To Work</div>
				</section>
			</div>
		);
	}

	_toDos(){
		let todos = [];

		for(let todo in this.props.todos){
			let list_element;
			if (!this.props.todos[todo][1]){
				list_element = <li style={style.incomplete_todo} key={todo}>{this.props.todos[todo][0]}</li>;
			} else {
				list_element = <li style={style.complete_todo} key={todo}>{this.props.todos[todo][0]}</li>;
			}
			todos.push([list_element, <input type='checkbox' onClick={() => { this.props.toggleToDoCompletion(todo) }} />, <br />]);
		}

		return todos;
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

	_recordReturnToWork(){
		let current_time = Date.now();
		this.setState({ returns_to_work: [...this.state.returns_to_work, current_time] });
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
		this.props.setSessionData('returns_to_work', this.state.returns_to_work);
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
}