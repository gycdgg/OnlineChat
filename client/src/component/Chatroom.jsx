
import React from 'react'
import { Button, Input } from 'antd'
import { connect } from 'react-redux'
import * as messageActions from '../action/message'
import PropTypes from 'prop-Types'
import socket from '../socket'
const TextArea = Input.TextArea
@connect(message => message, (dispatch) => ({
  getMessage: (...args) => {
    dispatch(messageActions.getMessage(...args))
  },
  sendMessage: (...args) => {
    dispatch(messageActions.sendMessage(...args))
  }
}))
class Chatroom extends React.Component {
  
  static propTypes  = {
    message: PropTypes.object.isRequired
  }

  state = {
    inputValue: ''
  }

  componentDidMount() {
    socket.on('message', (data) => {
      this.props.getMessage(data)
    })
  }

  handleClick = () => {
    socket.emit('message', { content: this.state.inputValue, user_id: 1 })
  }

  render() {
    return <div>
      <p>
        消息内容
        { this.props.message.list.map((v, i) => <div key = { i }>{ v && v.content }</div>) }
      </p>
      <TextArea value = { this.state.inputValue } onChange = { (e) => this.setState({ inputValue: e.target.value }) }/>
      <Button onClick = { this.handleClick }>确认</Button>
    </div>
  }
}

export default Chatroom