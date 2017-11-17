import React, { Component } from 'react'; 
import * as Cookies from 'js-cookie';


export default class SessionApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      todos: []
    };

    this.flash_message = '';

    this._setSessionData = this._setSessionData.bind(this);
    this._submitSessionData = this._submitSessionData.bind(this);
    this._addToDo = this._addToDo.bind(this);
    this._removeToDo = this._removeToDo.bind(this);
    this._toggleToDoCompletion = this._toggleToDoCompletion.bind(this);
  }

  componentDidMount(){
    let csrftoken = Cookies.get('csrftoken');
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    });
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          setSessionData: this._setSessionData,
          submitSessionData: this._submitSessionData,
          todos: this.state.todos,
          addToDo: this._addToDo,
          removeToDo: this._removeToDo,
          toggleToDoCompletion: this._toggleToDoCompletion
        })}
      </div>
    );
  }

  _addToDo(todo){
    this.setState({ todos: [...this.state.todos, [todo, false]] }); // one todo -> [(str)todo_name, (bool)completed]
  }

  _removeToDo(index){
    this.state.todos.splice(index, 1);
    this.setState({ todos: this.state.todos });
  }

  _toggleToDoCompletion(index){
    this.state.todos[index][1] = !this.state.todos[index][1];
    this.setState({ todos: this.state.todos });
  }

  _setSessionData(field_name, field_data){
    this.setState({ [field_name]: field_data });
  }

  _submitSessionData(){
    console.log(this.state);
    $.post('/sessions/save/', 
      this.state);  
    this.setState({todos: []});
  }
}