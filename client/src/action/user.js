import fetch from '$fetch'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILD'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILED = 'REGISTER_FAILED'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const login = (user) => (dispatch) => fetch('/api/session', {
  method: 'POST',
  body: user
}).then(res => {
  if(user.action === 'login') { 
    dispatch({ type: LOGIN_SUCCESS, payload: res }) 
  } else {
    dispatch({ type: REGISTER_SUCCESS, payload: res })
  }
}, () => { 
  if(user.action === 'login') { 
    dispatch({ type: LOGIN_FAILED, payload: {} }) 
  }else {
    dispatch({ type: REGISTER_FAILED, payload: {} }) 
  }
})

const checkAuth = () => (dispatch) => fetch('/api/session').then(res => dispatch({ type: LOGIN_SUCCESS, payload: res }))

const logout = () => (dispatch) => fetch('/api/session', {
  method: 'DELETE'
}).then(res => dispatch({ type: LOGOUT_SUCCESS, payload: res }))


export {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  login,
  checkAuth,
  logout
}