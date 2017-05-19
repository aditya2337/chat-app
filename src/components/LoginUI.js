import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../containers/Input'
import LoginButton from '../containers/LoginButton'
import { setUserName, setUserAvatar } from '../redux/actions'

const mapStateToProps = (state) => ({
  authorizing: state.user.authorizing
})

class LoginUI extends Component {
  render () {
    return (
      <div style={{alignItems: 'center', justifyContent: 'center'}}>
        <article>Who are you?</article>
        <hr />

        <Input placeholder='Your name here'
          submitAction={setUserName}
          submitOnBlur
          noclear
          ref='username' />
        <hr />

        <Input placeholder='Your avatar URL here'
          submitAction={setUserAvatar}
          submitOnBlur
          noclear
          ref='avatar' />
        <hr />

        {this.props.authorizing ? <div>Loading ...</div> : <LoginButton />}
      </div>
    )
  }
}

export default connect(mapStateToProps)(LoginUI)
