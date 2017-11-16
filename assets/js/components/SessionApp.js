import React, { Component } from 'react'; 
import * as Cookies from 'js-cookie';


export default class SessionApp extends Component {
  constructor(props){
    super(props);

    this.state = {};

    this.flash_message = '';

    this._setSessionData = this._setSessionData.bind(this);
    this._submitSessionData = this._submitSessionData.bind(this);
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
          submitSessionData: this._submitSessionData
        })}
      </div>
    );
  }

  _setSessionData(field_name, field_data){
    console.log(`${field_name} set as ${field_data}`);
    this.setState({[field_name]: field_data});
  }

  _submitSessionData(){
    $.post('/sessions/save/', 
      this.state);  
  }
}
