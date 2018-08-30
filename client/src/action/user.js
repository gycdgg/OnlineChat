import fetch from '$fetch'
import { message } from 'antd'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILD'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILED = 'REGISTER_FAILED'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const SELECT_USER = 'SELECT_USER'
const CHANGE_AVATAR = 'CHANGE_AVATAR'

const login = (user) => (dispatch) => fetch('/api/session', {
  method: 'POST',
  body: user
}).then(res => {
  if(user.action === 'login') {
    message.success('登录成功')
    dispatch({ type: LOGIN_SUCCESS, payload: res }) 
  } else {
    message.success('注册成功')
    dispatch({ type: REGISTER_SUCCESS, payload: res })
  }
}, () => { 
  if(user.action === 'login') {
    message.error('账号密码错误')
    dispatch({ type: LOGIN_FAILED, payload: {} }) 
  }else {
    message.error('您的用户名被捷足先登啦')
    dispatch({ type: REGISTER_FAILED, payload: {} }) 
  }
})

const checkAuth = () => (dispatch) => fetch('/api/session').then(res => dispatch({ type: LOGIN_SUCCESS, payload: res })).catch(() => {
  dispatch({ type: LOGIN_FAILED, payload: {} })
})

const logout = () => (dispatch) => fetch('/api/session', {
  method: 'DELETE'
}).then(res => dispatch({ type: LOGOUT_SUCCESS, payload: res }))

const select_user = (user) => (dispatch) => dispatch({ type: SELECT_USER, payload: user })

const change_avatar = (user) => (dispatch) => dispatch({ type: CHANGE_AVATAR, payload: user })

export {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SELECT_USER,
  CHANGE_AVATAR,
  login,
  checkAuth,
  logout,
  select_user,
  change_avatar
}