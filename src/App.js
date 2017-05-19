import React, { Component } from 'react'
import './App.css'

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import ChatUI from './components/ChatUI'
import LoginUI from './components/LoginUI'
import rootReducer from './redux/reducers'

import { fetchMessages, checkUserExists } from './redux/actions'

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
)

const LoginOrChat = connect(
    (state) => ({
      authorized: state.user.authorized
    })
)(({ authorized, dispatch }) => {
  if (authorized) {
    return (<ChatUI />)
  } else {
    dispatch(checkUserExists())
    return (<LoginUI />)
  }
})

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className='App'>
          <LoginOrChat />
        </div>
      </Provider>
    )
  }
}

export default App
