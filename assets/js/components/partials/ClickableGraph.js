import React, { Component } from 'react';
import PropTypes from 'prop-types';


const style = {
	graph_container: {
		display: 'inline-block',
		width: 'fit-content',
		userSelect: 'none'
	},
	title: {
		textAlign: 'center',
		fontSize: '120%',
		fontWeight: 'bold'
	},
	graph: {
		display: 'inline-block',
		verticalAlign: 'middle',
		border: '1px solid black',
		background: 'linear-gradient(to top right, lightgrey, white)'
	},
	dot: {
		height: '1px',
		width: '1px'
	},
	first_axis: {
		display: 'inline-block',
		verticalAlign: 'middle',
		width: '120px',
		textAlign: 'center',
		fontStyle: 'italic'
	},
	second_axis: {
		textAlign: 'center',
		fontStyle: 'italic'
	},
	legend: {
		textAlign: 'center',
		fontSize: '80%'
	},
	hidden_legend: {
		visibility: 'hidden',
		fontSize: '80%'
	}
};

export default class ClickableGraph extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		firstAxis: PropTypes.array.isRequired,
		secondAxis: PropTypes.array.isRequired,
		setFirstVal: PropTypes.func.isRequired,
		setSecondVal: PropTypes.func.isRequired
	};

	constructor(props){
		super(props);

		this.state = {
			coordinates: []
		};
	}

	componentWillMount(){
		this.id = `${this.props.title}_canvas`;
	}

	componentDidMount(){ 
		this.canvas = document.getElementById(this.id);
		this.ctx = this.canvas.getContext('2d');
		this.canvas_pos = this.canvas.getBoundingClientRect();
		this._drawCross(); 

		window.addEventListener('resize', this._recalibrateCanvasPos);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this._recalibrateCanvasPos);
	}

	render(){
		return (
			<div style={style.graph_container}>
				<header style={style.title}>{this.props.title}</header>
				<div style={style.second_axis}>{this.props.secondAxis[1]}</div>
				<div>
					<div style={style.first_axis}>{this.props.firstAxis[0]}</div>
					<canvas style={style.graph} id={this.id} width={200} height={200} onClick={(e) => { this._handleClick(e); }}>
					</canvas>
					<div style={style.first_axis}>{this.props.firstAxis[1]}</div>
				</div>
				<div style={style.second_axis}>{this.props.secondAxis[0]}</div>
				<section>{this._label()}</section>
			</div>
		);
	}

	_drawCross(){
		this.ctx.beginPath();
		this.ctx.moveTo(0, 100);
		this.ctx.lineTo(200, 100);
		this.ctx.moveTo(100, 0);
		this.ctx.lineTo(100, 200);
		this.ctx.stroke();
	}

	_recalibrateCanvasPost(){
		this.canvas_pos = this.canvas.getBoundingClientRect();
	}

	_handleClick(e) {
		let x = e.pageX - this.canvas_pos.x, 
			y = e.pageY - this.canvas_pos.y;
		this.ctx.clearRect(0, 0, 200, 200);
		this._drawCross();
		this.ctx.fillRect(x - 2, y - 2, 4, 4);
		this.setState({coordinates: [x, y]});
		this._setValues(x, y);
	}

	_setValues(x, y){
		let firstAxisVal = Math.floor(x - 100),
			secondAxisVal = Math.floor(100 - y);
		this.props.setFirstVal(firstAxisVal);
		this.props.setSecondVal(secondAxisVal);
	}

	_label(){
		if(this.state.coordinates.length == 0){
			return [<div style={style.hidden_legend} key='1'>filler</div>, <div style={style.hidden_legend} key='2'>filler</div>];
		} else {
			let x = this.state.coordinates[0],
				y = this.state.coordinates[1],
				xLabel, yLabel, xVal, yVal;

			if(x < 100){
				xLabel = this.props.firstAxis[0];
				xVal = Math.round(100 - x);
			} else {
				xLabel = this.props.firstAxis[1];
				xVal = Math.round(x - 100);
			}

			if(y < 100){
				yLabel = this.props.secondAxis[1];
				yVal = Math.round(100 - y);
			} else {
				yLabel = this.props.secondAxis[0];
				yVal = Math.round(y - 100);
			}

			let xLegend = `${xLabel}: ${xVal}%`,
				yLegend = `${yLabel}: ${yVal}%`

			return [<div style={style.legend} key='1'>{xLegend}</div>, <div style={style.legend} key='2'>{yLegend}</div>];
		}
	}
}