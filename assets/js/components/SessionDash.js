import React, { Component } from 'react';
import { Link } from 'react-router';
import './style/todoInput.css';


const style = {
	dashboard_container: {
		marginTop: '200px'
	},
	button_container: {
		position: 'relative',
		display: 'inline-block',
		width: '225px',
		height: '200px',
		padding: '10px 20px',
		border: '1px solid rgb(56, 58, 59)',
		borderLeft: 'none'
	},
	button: {
		position: 'absolute',
		bottom: '67px',
		display: 'block',
		backgroundColor: 'rgb(116, 196, 173)',
		color: 'rgb(56, 58, 59)',
		fontSize: '24px',
		padding: '15px 25px',
		borderRadius: '50px',
		userSelect: 'none'
	},
	todo_container: {
		display: 'inline-block',
		width: '225px',
		height: '200px',
		padding: '10px',
		border: '1px solid rgb(56, 58, 59)',
		borderRight: '1px dotted rgb(56, 58, 59)',
		verticalAlign: 'top'
	},
	todo_header: {
		fontSize: '160%',
		cursor: 'default',
		userSelect: 'none'
	},
	todo_list: {
		height: '150px',
		padding: '0 20px',
		overflow: 'scroll',
		userSelect: 'none'
	},
	todo: {
		display: 'inline-block',
		width: '150px',
		cursor: 'default',
		userSelect: 'none'
	},
	remove_todo: {
		display: 'inline-block',
		width: '10px',
		textAlign: 'center',
		cursor: 'pointer',
		userSelect: 'none'
	}
};

export default class SessionDash extends Component {
	constructor(props){
		super(props);

		this.state = {
			input: ''
		};

		this._handleTextChange = this._handleTextChange.bind(this);
		this._addToDo = this._addToDo.bind(this);
	}

	componentDidMount(){ 
		Notification.requestPermission(); 
		this.input.focus();
	}

	render(){
		return (
			<div style={style.dashboard_container}>
				<section style={style.todo_container}>
					<header style={style.todo_header}>Session To-Dos:</header>
					<ul style={style.todo_list}>
						{this._toDos()}
						<input type='text' 
							value={this.state.input} 
							onChange={this._handleTextChange} 
							ref={(input) => {this.input = input}}
							className='todo_input' />
						<span onClick={this._addToDo} className='add_todo'>+</span>
					</ul>
				</section>
				<section style={style.button_container}>
					<Link style={style.button} to='/session'>Start session</Link>
				</section>
			</div>
		);
	}

	_toDos(){
		let todos = [];
		
		for(let todo in this.props.todos){
			console.log(this.props.todos[todo][0])
			todos.push([<li style={style.todo} key={todo}>{this.props.todos[todo][0]}</li>, 
				<span onClick={() => {this._removeToDo(todo);}} style={style.remove_todo}>x</span>, 
				<br />]);
		}
		
		return todos;
	}

	_handleTextChange(e){
		this.setState({
			input: e.target.value
		});
	}

	_addToDo(){
		if(this.state.input != ''){
			this.props.addToDo(this.state.input);
			this.setState({ input: '' });
			this.input.focus();
		}
	}

	_removeToDo(index){
		this.props.removeToDo(index);
	}
}