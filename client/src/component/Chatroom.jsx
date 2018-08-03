
import React from 'react'
import { Button, Input } from 'antd'
import { connect } from 'react-redux'
import * as messageActions from '../action/message'

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
  state = {
    inputValue: ''
  }
  componentDidMount() {
  }

  handleClick = () => {
    
  }

  render() {
    return <div>
      <p>
        消息内容
        { this.props.message.list.map((v, i) => <div key = { i }>{ v }</div>) }
      </p>
      <TextArea value = { this.state.inputValue } onChange = { (e) => this.setState({ inputValue: e.target.value }) }/>
      <Button onclick = { this.handleClick }/>
    </div>
  }
}

export default Chatroom