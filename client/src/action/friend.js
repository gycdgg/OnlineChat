import fetch from '$fetch'

const GET_FRIEND_LIST = 'GET_FRIEND_LIST'

const get_friend_list = () => (dispatch) => fetch('/api/friends').then(res => dispatch({ type: GET_FRIEND_LIST, payload: res.rows }))


export {
  GET_FRIEND_LIST,
  get_friend_list
}