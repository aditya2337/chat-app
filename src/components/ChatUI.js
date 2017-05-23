import React, { Component } from 'react'
import { connect } from 'react-redux'

import Messages from '../containers/Messages'
import Input from '../containers/Input'
import { sendMessage, addLocalStorage } from '../redux/actions'
import Spinner from 'react-spinkit'

const mapStateToProps = (state) => ({
  chatHeight: state.chatroom.meta.height,
  user: state.user,
  isModifyingLocal: state.chatroom.meta.isModifyingLocal
})

class ChatUI extends Component {
  state = {
    inputHeight: 0
  }

  componentWillMount () {
    if (localStorage.getItem('user') === null) {
      this.props.dispatch(addLocalStorage(this.props.user.name))
    }
  }

  sendMessage = (text) => {
    this.props.dispatch(sendMessage(text, this.props.user))
  }

  render () {
    const items = (this.props.isModifyingLocal) ? (
      <div className=' h-100 flex justify-center items-center'>
        <Spinner spinnerName='cube-grid' />
      </div>
    ) : (
      <div className='width-75'>
        <h4 className='tc' style={{paddingTop: 20}}>
          Global Chatroom
        </h4>
        <div>
          <Messages />
          <Input
            submitAction={this.sendMessage}
            ref='input'
            purpose='chat'
            placeholder='Say something cool ...' />
        </div>
      </div>
    )
    return (
      <div className='flex justify-center items-center h-100'>
        {items}
      </div>
    )
  }
}



export default connect(mapStateToProps)(ChatUI)
