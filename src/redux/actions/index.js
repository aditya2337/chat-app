import firebase from '../../config/firebase'

import actionTypes from './actionTypes'

const {
  ADD_MESSAGE,
  START_FETCHING_MESSAGES,
  RECEIVED_MESSAGES,
  UPDATE_MESSAGES_HEIGHT,
  SET_USER_NAME,
  SET_USER_AVATAR,
  USER_START_AUTHORIZING,
  USER_AUTHORIZED,
  USER_NO_EXIST
} = actionTypes

export const addMessage = (msg) => ({
  type: ADD_MESSAGE,
  ...msg
})

export const startAuthorizing = () => ({
  type: USER_START_AUTHORIZING
})

export const userAuthorized = () => ({
  type: USER_AUTHORIZED
})

export const userNoExist = () => ({
  type: USER_NO_EXIST
})

export const sendMessage = (text, user) => {
  return function (dispatch) {
    let msg = {
      text: text,
      time: Date.now(),
      author: {
        name: user.name,
        avatar: user.avatar
      }
    }

    const newMsgRef = firebase.database()
    .ref('messages')
    .push()
    msg.id = newMsgRef.key
    newMsgRef.set(msg)

    dispatch(addMessage(msg))
  }
}

export const startFetchingMessages = () => ({
  type: START_FETCHING_MESSAGES
})

export const receivedMessages = () => ({
  type: RECEIVED_MESSAGES,
  receivedAt: Date.now()
})

export const receiveMessages = (messages) => {
  return function (dispatch) {
    Object.values(messages).forEach(msg => dispatch(addMessage(msg)))

    dispatch(receivedMessages())
  }
}

export const fetchMessages = () => {
  return function (dispatch) {
    dispatch(startFetchingMessages())

    firebase.database()
    .ref('messages')
    .orderByKey()
    .limitToLast(20)
    .on('value', (snapshot) => {
      // gets around Redux panicking about actions in reducers
      setTimeout(() => {
        const messages = snapshot.val() || []

        dispatch(receiveMessages(messages))
      }, 0)
    })
  }
}

export const updateMessagesHeight = (event) => {
  const layout = event.nativeEvent.layout

  return {
    type: UPDATE_MESSAGES_HEIGHT,
    height: layout.height
  }
}

//
// User actions
//

export const setUserName = (name) => ({
  type: SET_USER_NAME,
  name
})

export const setUserAvatar = (avatar) => ({
  type: SET_USER_AVATAR,
  avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
})

const startChatting = function (dispatch) {
  dispatch(userAuthorized())
  dispatch(fetchMessages())
}

export const checkUserExists = (id) => {
  return function (dispatch) {
    dispatch(startAuthorizing())

    firebase.auth()
    .signInAnonymously()
    .then(() =>
    firebase.database()
    .ref(`users/${id}`)
    .once('value', (snapshot) => {
      const val = snapshot.val()
      if (val === null) {
        dispatch(userNoExist())
      } else {
        dispatch(setUserName(val.name))
        dispatch(setUserAvatar(val.avatar))
        startChatting(dispatch)
      }
    }))
    .catch(err => console.log(err))
  }
}

export const login = (id) => {
  return function (dispatch, getState) {
    dispatch(startAuthorizing())

    firebase.auth()
    .signInAnonymously()
    .then(() => {
      const { name, avatar } = getState().user

      firebase.database()
      .ref(`users/${id}`)
      .set({
        name,
        avatar
      })

      startChatting(dispatch)
    })
  }
}
