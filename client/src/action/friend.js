import fetch from '$fetch'
import socket from '../socket'
const GET_FRIEND_LIST = 'GET_FRIEND_LIST'
const SELECT_FRIEND = 'SELECT_FRIEND'
const CREATE_GROUP = 'CREATE_GROUP'
const get_friend_list = () => (dispatch) => fetch('/api/friends').then(res => { 
  res = res.map(v => {
    v.unread = 0
    return v
  })
  dispatch({ type: GET_FRIEND_LIST, payload: res }) 
})

const select_friend = (friendInfo) => (dispatch) => dispatch({ type: SELECT_FRIEND, payload: friendInfo })


const create_group = (groupInfo) => (dispatch) => {
  socket.emit('createGroup', groupInfo)
  socket.on('createGroup', data => {
    console.log(data)
  })
}

export {
  GET_FRIEND_LIST,
  SELECT_FRIEND,
  get_friend_list,
  select_friend,
  CREATE_GROUP,
  create_group
}