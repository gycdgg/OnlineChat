import fetch from '$fetch'
import socket from '../socket'
const GET_FRIEND_LIST = 'GET_FRIEND_LIST'
const SELECT_FRIEND = 'SELECT_FRIEND'
const CREATE_GROUP = 'CREATE_GROUP'
const ADD_FRIEND = 'ADD_FRIEND'
/**
 * get friend list
 * if there is a group try to connect
 */

const get_friend_list = () => (dispatch) => fetch('/api/friends').then(res => { 
  res = res.map(v => {
    v.unread = 0
    if(v.type === 'group') {
      socket.emit('join', v)
    }
    return v
  })
  dispatch({ type: GET_FRIEND_LIST, payload: res }) 
})

const select_friend = (friendInfo) => (dispatch) => dispatch({ type: SELECT_FRIEND, payload: friendInfo })


const create_group = (groupInfo) => () => {
  socket.emit('createGroup', groupInfo)
  socket.on('createGroup', data => {
    console.log(data)
  })
}

const add_friend = (data) => dispatch => dispatch({ type: ADD_FRIEND, payload: data })

export {
  GET_FRIEND_LIST,
  SELECT_FRIEND,
  ADD_FRIEND,
  CREATE_GROUP,
  get_friend_list,
  select_friend,
  create_group,
  add_friend
}