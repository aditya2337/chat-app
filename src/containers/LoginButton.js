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
      <button className='bw0 br2 bg-dwyl-teal pa1 w-100 pointer white fw1 tc ttu tracked' onClick={this.onLogin}>
        <p>Start Chatting</p>
      </button>
    )
  }
}

export default connect()(LoginButton);
