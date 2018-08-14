import fetch from '$fetch'

const GET_FRIEND_LIST = 'GET_FRIEND_LIST'
const SELECT_FRIEND = 'SELECT_FRIEND'
const get_friend_list = () => (dispatch) => fetch('/api/friends').then(res => dispatch({ type: GET_FRIEND_LIST, payload: res }))

const select_friend = (friendInfo) => (dispatch) => dispatch({ type: SELECT_FRIEND, payload: friendInfo })

export {
  GET_FRIEND_LIST,
  SELECT_FRIEND,
  get_friend_list,
  select_friend
}