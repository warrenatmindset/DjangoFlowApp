import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TenPointScale from './partials/TenPointScale';
import ClickableGraph from './partials/ClickableGraph';


const style = {
	header_text_container: {
		marginTop: '20px',
		fontWeight: 'bold'
	}, 
	congrats_text: {
		fontSize: '120%',
		color: 'rgb(116, 196, 173)',
		textTransform: 'uppercase'
	},
	inputs_container: {
		border: '1px solid black'
	},
	productivity_scale_container: {
		textAlign: 'center',
		margin: '10px 0 20px 0',
		borderBottom: '1px dotted black'
	},
	graphs_container: {
		marginBottom: '10px',
		textAlign: 'center'
	},
	submit_button: {
		float: 'right',
		backgroundColor: 'rgb(116, 196, 173)',
		width: '200px',
		height: '50px',
		lineHeight: '50px',
		margin: '30px 0px',
		borderRadius: '50px',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: '500',
		cursor: 'pointer'
	}
};

export default class SessionEnd extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	constructor(props){
		super(props);

		this.state = {
			productivity: false,
			focus: false,
			arousal: false,  
			satisfaction: false, 
			calm: false, 
			task_urgency: false, 
			task_familiarity: false 
		};

		this._submitSession = this._submitSession.bind(this);
		this._setProductivity = this._setProductivity.bind(this);
		this._setFocus = this._setFocus.bind(this);
		this._setArousal = this._setArousal.bind(this);
		this._setSatisfaction = this._setSatisfaction.bind(this);
		this._setCalm = this._setCalm.bind(this);
		this._setTaskUrgency = this._setTaskUrgency.bind(this);
		this._setTaskFamiliarity = this._setTaskFamiliarity.bind(this);
	}

	render(){
		return (
			<div>
				<header style={style.header_text_container}>
					<p style={style.congrats_text}>Congratulations on finishing a work session!</p>
					<ol>
						<li>Enter 1-10 on the productivity scale</li>
						<li>Click on each of the following graphs to indicate cognitive state, task description, & mood.</li>
						<li>After filling the form please submit!</li>
					</ol>
				</header>
				<section style={style.inputs_container}>
					<section style={style.productivity_scale_container}>
						<TenPointScale field='productivity' setValue={this._setProductivity} />
					</section>
					<section style={style.graphs_container}>
						<ClickableGraph 
							title={'COGNITIVE STATE'}
							firstAxis={['wide focus', 'narrow focus']}
							secondAxis={['tired', 'aroused']} 
							setFirstVal={this._setFocus}
							setSecondVal={this._setArousal}
							gradient={'linear-gradient(to top right, rgb(96, 46, 46), rgb(0, 255, 255))'} />
						<ClickableGraph 
							title={'TASK'}
							firstAxis={['urgent', 'nonurgent']}
							secondAxis={['unfamiliar', 'familiar']} 
							setFirstVal={this._setTaskUrgency}
							setSecondVal={this._setTaskFamiliarity} 
							gradient={'linear-gradient(to top right, rgb(128, 0, 0), rgb(255, 180, 0))'} />
						<ClickableGraph 
							title={'MOOD'}
							firstAxis={['stressed', 'calm']}
							secondAxis={['frustrated', 'satisfied']} 
							setFirstVal={this._setCalm}
							setSecondVal={this._setSatisfaction}
							gradient={'linear-gradient(to top right, rgb(255, 0, 0), rgb(0, 255, 140))'} />
					</section>
				</section>
				<div style={style.submit_button} onClick={this._submitSession}>Submit</div>
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


	_setSatisfaction(value) {
		this.setState({satisfaction: true});
		this.props.setSessionData('satisfaction', value);
	}

	_setCalm(value) {
		this.setState({calm: true});
		this.props.setSessionData('calm', value);
	}

	_setTaskUrgency(value) {
		this.setState({task_urgency: true});
		this.props.setSessionData('task_urgency', value);
	}

	_setTaskFamiliarity(value) {
		this.setState({task_familiarity: true});
		this.props.setSessionData('task_familiarity', value);
	}

	_setArousal(value) {
		this.setState({arousal: true});
		this.props.setSessionData('arousal', value);
	}
}