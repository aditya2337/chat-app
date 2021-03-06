import React from 'react'
import { connect } from 'react-redux'

import MessageList from '../components/MessageList'
import { updateMessagesHeight } from '../redux/actions'

const mapStateToProps = (state) => ({
  messages: state.chatroom.messages,
  isFetching: state.chatroom.meta.isFetching,
  isModifyingLocal: state.chatroom.meta.isModifyingLocal
})

const Messages = connect(
    mapStateToProps
)(({ messages, isFetching, dispatch, isModifyingLocal }) => {
  if (isFetching) {
    return (
      <div style={{paddingTop: 50,
        paddingBottom: 50}}>
        <div>Loading ...</div>
      </div>
    )
  } else {
    if (isModifyingLocal) {
      return (
        <div style={{paddingTop: 50,
          paddingBottom: 50}}>
          <div>Loading ...</div>
        </div>
      )
    } else {
      return (
        <MessageList messages={messages}
          style={{minHeight: 100}}
          onLayout={(event) => dispatch(updateMessagesHeight(event))} />
      )
    }
  }
})

export default Messages
