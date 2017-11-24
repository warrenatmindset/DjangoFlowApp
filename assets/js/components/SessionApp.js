import React, { Component } from 'react'; 


export default class SessionApp extends Component {
  constructor(props){
    super(props);

    this.SOCKET_PORT = 5000;

    this.state = {
      todos: []
    };

    this._setSessionData = this._setSessionData.bind(this);
    this._submitSessionData = this._submitSessionData.bind(this);
    this._addToDo = this._addToDo.bind(this);
    this._removeToDo = this._removeToDo.bind(this);
    this._toggleToDoCompletion = this._toggleToDoCompletion.bind(this);
  }

  componentDidMount(){
    this._initSocket();
  }

  componentWillUnmount(){
    this.socket.close();
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
          toggleToDoCompletion: this._toggleToDoCompletion,
          beginEEGRecording: this._beginEEGRecording
        })}
      </div>
    );
  }

  _initSocket(){
    try {
      this.socket = new WebSocket(`ws://localhost:${this.SOCKET_PORT}`);
      this.socket.onopen = (event) => { console.log(`socket @ port ${this.SOCKET_PORT} open`); };
      this.socket.onmessage = (event) => { this._receiveSocketMessage(event.data); };
    } catch(err) {
      alert('failed to open WebSocket connection')
    }
  }

  _receiveSocketMessage(data){
    switch(data){
      case 'eeg-recording':
        alert('eeg recording');
        break;
      case 'error':
        alert('error: eeg not recording');
        break;
    }
  }

  _beginEEGRecording(){
    try { 
      this.socket.send('begin-eeg-recording'); 
    } catch(err) {
      alert('failed to send begin EEG recording through WebSocket');
    }
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