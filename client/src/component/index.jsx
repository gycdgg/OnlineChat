
import React from 'react'
import { connect } from 'react-redux'
import * as messageActions from '../action/message'
import { Spin } from 'antd'
import { checkAuth } from '../action/user'
import PropTypes from 'prop-Types'
import styles from './styles.styl'
import Login from './Login'
import Chatroom from './chatroom'

@connect(({ message, user }) => ({ message, user }), (dispatch) => ({
  sendMessage: (...args) => {
    dispatch(messageActions.sendMessage(...args))
  },
  checkAuth: (...args) => {
    dispatch(checkAuth(...args))
  }
}))

class App extends React.Component {
  
  static propTypes  = {
    checkAuth: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  state = {
    inputValue: ''
  }

  componentDidMount() {
    this.props.checkAuth()
  }

  render() {
    const { user } = this.props
    return <div className = { styles.wrapper }>
    { user.pending ? <Spin/> : (user.isLogin ? <Chatroom/> : <Login/>) }
    </div>
  }
}

export default App