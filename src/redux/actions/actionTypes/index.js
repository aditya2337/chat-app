import chatroom from './chatroom'
import messages from './messages'
import user from './user'

let actionTypes = {
  ...chatroom,
  ...messages,
  ...user
}

export default actionTypes
