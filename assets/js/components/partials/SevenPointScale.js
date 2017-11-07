import React, { Component } from 'react';
import PropTypes from 'prop-types';


const style = {
	title: {
		display: 'inline-block',
		width: '150px'
	},
	button: {
		display: 'inline-block',
		margin: '0px 32px',
		textAlign: 'center'
	},
	header: {
		display: 'inline-block',
		width: '70px',
		margin: '3px',
		textAlign: 'center'
	},
	row: {
		width: 'fit-content',
		borderBottom: '1px solid black',
		margin: '5px 0',
		padding: '5px 0'
	}
}

export default class SevenPointScale extends Component {
	static propTypes = {
		setValue: PropTypes.func.isRequired,
		field: PropTypes.string.isRequired,
		lowValue: PropTypes.string.isRequired, 
		midValue: PropTypes.string.isRequired,
		highValue: PropTypes.string.isRequired
	};

	static defaultProps = {
		lowValue: 'low',
		midValue: '',
		highValue: 'high'
	};

	constructor(props){
		super(props);
	}

	render() {
		return(
			<div style={style.row}>
				<div>
					<span style={style.title}></span>
					<span style={style.header}>{this.props.lowValue}</span>
					<span style={style.header}></span>
					<span style={style.header}></span>
					<span style={style.header}>{this.props.midValue}</span>
					<span style={style.header}></span>
					<span style={style.header}></span>
					<span style={style.header}>{this.props.highValue}</span>
				</div>
				<div>
					<span style={style.title}>{this.props.field}</span>
					<input onClick={(e) => { this._setInput(e); }} type='radio' name={this.props.field} value='1' style={style.button} />
					<input onClick={(e) => { this._setInput(e); }} type='radio' name={this.props.field} value='2' style={style.button} />
					<input onClick={(e) => { this._setInput(e); }} type='radio' name={this.props.field} value='3' style={style.button} />
					<input onClick={(e) => { this._setInput(e); }} type='radio' name={this.props.field} value='4' style={style.button} />
					<input onClick={(e) => { this._setInput(e); }} type='radio' name={this.props.field} value='5' style={style.button} />
					<input onClick={(e) => { this._setInput(e); }} type='radio' name={this.props.field} value='6' style={style.button} />
					<input onClick={(e) => { this._setInput(e); }} type='radio' name={this.props.field} value='7' style={style.button} />
				</div>
			</div>
		);
	}

	_setInput(e){
		this.props.setValue(e.target.value);
	}
}