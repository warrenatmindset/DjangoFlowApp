import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TenPointScale from './partials/TenPointScale';
import ClickableGraph from './partials/ClickableGraph';


const style = {
	header_text_container: {
		textAlign: 'center',
		fontWeight: 'bold',
		userSelect: 'none'
	}, 
	inputs_container: {
		border: '1px solid black',
		userSelect: 'none'
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
					<p>Congratulations on finishing a work session!</p>
					<p>Please fill the following form & submit:</p>
				</header>
				<section style={style.inputs_container}>
					<section style={style.productivity_scale_container}>
						<TenPointScale field='productivity' setValue={this._setProductivity} />
					</section>
					<section style={style.graphs_container}>
						<ClickableGraph 
							title={"Cognitive State"}
							firstAxis={['WIDE FOCUS', 'NARROW FOCUS']}
							secondAxis={['TIRED', 'AROUSED']} 
							setFirstVal={this._setFocus}
							setSecondVal={this._setArousal}/>
						<ClickableGraph 
							title={"Task"}
							firstAxis={['NONURGENT', 'URGENT']}
							secondAxis={['UNFAMILIAR', 'FAMILIAR']} 
							setFirstVal={this._setTaskUrgency}
							setSecondVal={this._setTaskFamiliarity}/>
						<ClickableGraph 
							title={"Mood"}
							firstAxis={['STRESSED', 'CALM']}
							secondAxis={['FRUSTRATED', 'SATISFIED']} 
							setFirstVal={this._setCalm}
							setSecondVal={this._setSatisfaction}/>
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