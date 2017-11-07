import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SevenPointScale from './partials/SevenPointScale';
import SevenPointScaleHeader from './partials/SevenPointScaleHeader';


export default class SessionEnd extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	constructor(props){
		super(props);

		this.state = {
			productivity: false,
			focus: false, 
			task_importance: false, 
			satisfaction: false, 
			mood: false, 
			task_urgency: false, 
			task_complexity: false, 
			task_familiarity: false, 
			arousal: false, 
			fatigue: false
		};

		this._submitSession = this._submitSession.bind(this);
		this._setProductivity = this._setProductivity.bind(this);
		this._setFocus = this._setFocus.bind(this);
		this._setTaskImportance = this._setTaskImportance.bind(this);
		this._setSatisfaction = this._setSatisfaction.bind(this);
		this._setMood = this._setMood.bind(this);
		this._setTaskUrgency = this._setTaskUrgency.bind(this);
		this._setTaskComplexity = this._setTaskComplexity.bind(this);
		this._setTaskFamiliarity = this._setTaskFamiliarity.bind(this);
		this._setArousal = this._setArousal.bind(this);
		this._setFatigue = this._setFatigue.bind(this);
	}

	render(){
		return (
			<div>
				<p>Congratulations on finishing a work session!</p>
				<p>Please fill the following form:</p>
				<SevenPointScaleHeader />
				<SevenPointScale field='productivity' setValue={this._setProductivity} />
				<SevenPointScale field='focus' lowValue='shallow' highValue='deep' setValue={this._setFocus} />
				<SevenPointScale field='task_importance' setValue={this._setTaskImportance} />
				<SevenPointScale field='satisfaction' setValue={this._setSatisfaction} />
				<SevenPointScale field='mood' lowValue='stressed' highValue='calm' setValue={this._setMood} />
				<SevenPointScale field='task_urgency' setValue={this._setTaskUrgency} />
				<SevenPointScale field='task_complexity' lowValue='simple' highValue='complex' setValue={this._setTaskComplexity} />
				<SevenPointScale field='task_familiarity' setValue={this._setTaskFamiliarity} />
				<SevenPointScale field='arousal' setValue={this._setArousal} />
				<SevenPointScale field='fatigue_since_start' lowValue='lower' midValue='same' highValue='higher' setValue={this._setFatigue} />
				<div onClick={this._submitSession}>Submit</div>
			</div>
		);
	}

	_submitSession(){
		let valid = true;
		for(let field in this.state){
			if(!this.state[field])
				valid = false;
		}

		if(valid){
			this.props.submitSessionData();
			this.props.setFlashMessage('Succesfully submitted the session!');
			this.context.router.push('/');
		} else {
			alert('Please answer all questions before submitting');
		}
	}

	_setProductivity(value) {
		this.setState({productivity: true});
		this.props.setSessionData('productivity', value);
	}

	_setFocus(value) {
		this.setState({focus: true});
		this.props.setSessionData('focus', value);
	}

	_setTaskImportance(value) {
		this.setState({task_importance: true});
		this.props.setSessionData('task_importance', value);
	}

	_setSatisfaction(value) {
		this.setState({satisfaction: true});
		this.props.setSessionData('satisfaction', value);
	}

	_setMood(value) {
		this.setState({mood: true});
		this.props.setSessionData('mood', value);
	}

	_setTaskUrgency(value) {
		this.setState({task_urgency: true});
		this.props.setSessionData('task_urgency', value);
	}

	_setTaskComplexity(value) {
		this.setState({task_complexity: true});
		this.props.setSessionData('task_complexity', value);
	}

	_setTaskFamiliarity(value) {
		this.setState({task_familiarity: true});
		this.props.setSessionData('task_familiarity', value);
	}

	_setArousal(value) {
		this.setState({arousal: true});
		this.props.setSessionData('arousal', value);
	}

	_setFatigue(value) {
		this.setState({fatigue: true});
		this.props.setSessionData('fatigue', value);
	}
}