import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../containers/Input'
import LoginButton from '../containers/LoginButton'
import { setUserName, setUserAvatar } from '../redux/actions'

import Spinner from 'react-spinkit'

const mapStateToProps = (state) => ({
  authorizing: state.user.authorizing
})

class LoginUI extends Component {
  render () {
    return (
      <div className='flex justify-around items-center h-100'>
        <div className='vh-50 tc width-50 flex flex-column justify-around'>
          <article className='f1'>Who are you?</article>
          <div class>
            <Input placeholder='Your name here'
              submitAction={setUserName}
              submitOnBlur
              noclear
              ref='username' />
          </div>
          <div>
            <Input placeholder='Your avatar URL here'
              submitAction={setUserAvatar}
              submitOnBlur
              noclear
              ref='avatar' />
          </div>
          {this.props.authorizing ? <div className='center'><Spinner spinnerName='folding-cube' /></div> : <LoginButton />}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LoginUI)
