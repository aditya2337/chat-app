import React, { Component } from 'react'
import moment from 'moment'

const Message = ({ msg }) => (
  <div>
    <img style={{maxHeight: '50px', maxWidth: '50px'}}
      src={msg.author.avatar} />
    <div styleName='vertical'>
      <div styleName='horizontal space-between'>
        <em>{msg.author.name}</em>
        <strong>{moment(msg.time).from(Date.now())}</strong>
      </div>
      <p styleName='multiline'>{msg.text}</p>
    </div>
  </div>
)

const MessageList = ({ messages, onLayout }) => (
  <ul>
    {messages.map((val, index) => (
      <li>
        <Message msg={val} key={index} />
      </li>
    ))}
  </ul>
)

export default MessageList
