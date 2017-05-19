import actionTypes from '../actions/actionTypes'

const {
  SET_USER_NAME,
  SET_USER_AVATAR,
  USER_START_AUTHORIZING,
  USER_AUTHORIZED
} = actionTypes

const initialState = {
  name: null,
  avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  authorizing: false,
  authorized: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    case SET_USER_AVATAR:
      return Object.assign({}, state, {
        avatar: action.avatar
      })
    case USER_START_AUTHORIZING:
      return Object.assign({}, state, {
        authorizing: true
      })
    case USER_AUTHORIZED:
      return Object.assign({}, state, {
        authorizing: false,
        authorized: true
      })
    default:
      return state
  }
}

export default user
