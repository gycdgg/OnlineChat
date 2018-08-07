
import React from 'react'
import { Button, Input } from 'antd'
import { connect } from 'react-redux'
import * as messageActions from '../action/message'
import { checkAuth } from '../action/user'
import PropTypes from 'prop-Types'
import styles from './styles.styl'
import Login from './Login'
import socket from '../socket'
import Chatroom from './chatroom'
const TextArea = Input.TextArea

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

  handleClick = () => {
    socket.emit('message', { content: this.state.inputValue, user_id: 1 })
  }

  render() {
    const { user } = this.props
    console.log(this.props.user)
    return <div className = { styles.wrapper }>
      { user.isLogin ? <Chatroom/> : <Login/> }
    </div>
  }
}

export default App