import * as firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyD6zq9qKcDhgr6dwbCZzj-Ssv-6kcpZwE4',
  authDomain: 'chat-room-4b984.firebaseapp.com',
  databaseURL: 'https://chat-room-4b984.firebaseio.com',
  projectId: 'chat-room-4b984',
  storageBucket: 'chat-room-4b984.appspot.com',
  messagingSenderId: '36519187338'
}
firebase.initializeApp(config)
export default firebase
