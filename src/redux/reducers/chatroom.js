import actionTypes from '../actions/actionTypes'
import { combineReducers } from 'redux'
import messages from './messages'

const {
  START_FETCHING_MESSAGES,
  RECEIVED_MESSAGES,
  UPDATE_MESSAGES_HEIGHT
} = actionTypes

const initialState = {
  isFetching: false,
  lastFetched: null,
  height: 0,
  isModifyingLocal: false,
  isDeleting: false
}

const meta = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_MESSAGES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVED_MESSAGES:
      return Object.assign({}, state, {
        isFetching: false,
        lastFetched: action.receivedAt
      })
    case UPDATE_MESSAGES_HEIGHT:
      return Object.assign({}, state, {
        height: action.height
      })
    case 'START_MOIFYING_LOCAL':
      return Object.assign({}, state, {
        isModifyingLocal: true
      })
    case 'START_DELETING_LOCAL':
      return Object.assign({}, state, {
        isDeleting: true
      })
    case 'STOP_DELETING_LOCAL':
      return Object.assign({}, state, {
        isDeleting: false
      })
    case 'STOP_MOIFYING_LOCAL':
      return Object.assign({}, state, {
        isModifyingLocal: false
      })
    default:
      return state
  }
}

const chatroom = combineReducers({
  messages,
  meta
})

export default chatroom
