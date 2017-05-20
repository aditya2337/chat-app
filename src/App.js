import React, { Component } from 'react'
import './App.css'

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Spinner from 'react-spinkit'

import ChatUI from './components/ChatUI'
import LoginUI from './components/LoginUI'
import rootReducer from './redux/reducers'

import { checkUserExists, clearLocalStorage } from './redux/actions'

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
)

const LoginOrChat = connect(
    (state) => ({
      authorized: state.user.authorized,
      isDeleting: state.chatroom.meta.isDeleting
    })
)(({ authorized, isDeleting, dispatch }) => {
  if (authorized) {
    if (isDeleting) {
      return (
        <div className='h-100 flex justify-center items-center'>
          <Spinner spinnerName='wordpress' />
        </div>
      )
    } else {
      return (<ChatUI />)
    }
  } else {
    if (isDeleting) {
      return (
        <div className='h-100 flex justify-center items-center'>
          <Spinner spinnerName='wordpress' />
        </div>
      )
    } else {
      dispatch(checkUserExists())
      return (<LoginUI />)
    }
  }
})

class App extends Component {

  componentWillMount () {
    store.dispatch(clearLocalStorage())
  }

  render () {
    return (
      <Provider store={store}>
        <div className='h-100'>
          <LoginOrChat />
        </div>
      </Provider>
    )
  }
}

export default App
