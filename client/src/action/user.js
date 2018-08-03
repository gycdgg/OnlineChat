import fetch from '$fetch'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const login = (user) => (dispatch) => fetch('/api/session', {
  method: 'POST',
  body: user
}).then(res => dispatch({ type: LOGIN_SUCCESS, payload: res }))

const checkAuth = () => (dispatch) => fetch('/api/session').then(res => dispatch({ type: LOGIN_SUCCESS, payload: res }))

const logout = () => (dispatch) => fetch('/api/session', {
  method: 'DELETE'
}).then(res => dispatch({ type: LOGOUT_SUCCESS, payload: res }))


export {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  login,
  checkAuth,
  logout
}