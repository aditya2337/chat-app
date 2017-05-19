import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../redux/actions';

class LoginButton extends Component {
  onLogin = () => {
    const obj = {name: 'aditya'}
    this.props.dispatch(login(1));
  }

  render() {
    return (
      <button styleName="light" onClick={this.onLogin}>
        <p>Start Chatting</p>
      </button>
    )
  }
}

export default connect()(LoginButton);
