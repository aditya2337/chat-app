import React, { Component } from 'react'
import { connect } from 'react-redux'

import Messages from '../containers/Messages'
import Input from '../containers/Input'
import { sendMessage, addLocalStorage } from '../redux/actions'

const mapStateToProps = (state) => ({
  chatHeight: state.chatroom.meta.height,
  user: state.user,
  isModifyingLocal: state.chatroom.meta.isModifyingLocal
})

class ChatUI extends Component {
  state = {
    scrollViewHeight: 0,
    inputHeight: 0
  }

  componentWillMount () {
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('user') === null) {
      this.props.dispatch(addLocalStorage(this.props.user.name))
    }
    this.scrollToBottom(false)
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  onScrollViewLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
      scrollViewHeight: layout.height
    });
  }

  onInputLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
      inputHeight: layout.height
    });
  }

  scrollToBottom (animate = true) {
    const { scrollViewHeight, inputHeight } = this.state,
      { chatHeight } = this.props

    const scrollTo = chatHeight - scrollViewHeight + inputHeight

    if (scrollTo > 0) {
      this.refs.scroll.scrollToPosition(0, scrollTo, animate)
    }
  }

  sendMessage = (text) => {
    this.props.dispatch(sendMessage(text, this.props.user))
  }

  render () {

    console.log(this.props.isModifyingLocal)
    const items = (this.props.isModifyingLocal) ? (
      <div>
        Loading ...
      </div>
    ) : (
      <div className='width-75'>
        <h4 styleName='h-center' style={{paddingTop: 20}}>
          Global Chatroom
        </h4>
        <div ref='scroll'
          onLayout={this.onScrollViewLayout}>
          <Messages />
          <Input onLayout={this.onInputLayout}
            submitAction={this.sendMessage}
            ref='input'
            placeholder='Say something cool ...' />
        </div>
      </div>
    )
    return (
      <div className='flex justify-center items-center'>
        {items}
      </div>
    )
  }
}



export default connect(mapStateToProps)(ChatUI)
