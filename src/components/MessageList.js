import React, { Component } from 'react'
import moment from 'moment'

const Message = ({ msg, position }) => (
  <div className={`flex ${position}`}>
    <div className={`flex w-100 ${(localStorage.user !== msg.author.name) ? 'reverse-row' : ''}`}>
      <div>
        <img style={{maxHeight: '50px', maxWidth: '50px'}}
          src={msg.author.avatar} />
      </div>
      <div className={`ba ${(localStorage.user !== msg.author.name) ? 'mr4 tr' : 'ml4 tl'} pa3 w-50`}>
        <div>
          <em>{msg.author.name}</em>
          <small> {moment(msg.time).from(Date.now())}</small>
        </div>
        <p>{msg.text}</p>
      </div>
    </div>
  </div>
)

const MessageList = ({ messages, onLayout }) => (
  <ul className='list overflow-scroll overflow-x-hidden ba vh-75 pa3'>
    {messages.map((val, index) => (
      <li className='mb4'>
        {(index % 2 === 0) ? (
          <Message msg={val} key={index} position='' />
        ) : (
          <Message msg={val} key={index} position='flex-row-reverse' />
        )}
      </li>
    ))}
  </ul>
)

export default MessageList
