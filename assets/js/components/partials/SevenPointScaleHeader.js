import React, { Component } from 'react';


const style = {
	buffer: {
		display: 'inline-block',
		width: '150px'
	},
	buttonHeader: {
		display: 'inline-block',
		width: '70px',
		margin: '3px',
		textAlign: 'center'
	}
}

export default class SevenPointScaleHeader extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<span style={style.buffer}></span>
				<span style={style.buttonHeader}>1</span>
				<span style={style.buttonHeader}>2</span>
				<span style={style.buttonHeader}>3</span>
				<span style={style.buttonHeader}>4</span>
				<span style={style.buttonHeader}>5</span>
				<span style={style.buttonHeader}>6</span>
				<span style={style.buttonHeader}>7</span>
			</div>
		);
	}
}