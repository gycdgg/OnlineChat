import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import * as messageActions from '../../action/message'
import PropTypes from 'prop-Types'
import moment from 'moment'
@connect(({ message, user }) => ({ message, user }), (dispatch) => ({
  getMessage: (...args) => {
    dispatch(messageActions.getMessage(...args))
  },
  sendMessage: (...args) => {
    dispatch(messageActions.sendMessage(...args))
  },
  checkAuth: (...args) => {
    dispatch(checkAuth(...args))
  }
}))

class Content extends React.Component {

  static propTypes = {
    message: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired
  }
  state = {
    inputValue: ''
  }

  componentDidMount() {
    // register a socket to receive message
    this.props.getMessage()
  }

  handleSumit = () => {
    const { user } = this.props
    console.log(this.state.inputValue)
    const message = { username: user.username, userId: user.id, time: new Date(), content: this.state.inputValue }
    this.props.sendMessage(message)
    this.setState({ inputValue: '' })
  }

  handleKeypress = (e) => {
    console.log(window.event.ctrlKey, window.event)
    if(window.event.keyCode === 13 && !window.event.shiftKey) {
      e.preventDefault()
      this.handleSumit()
    }
  }
  render() {
    const { inputValue } = this.state
    const { message, user } = this.props
    return <div className = { styles.main__content }>
      <div className = { styles.main__content__messages }>
        { message.list.map((v, i) => <div key = { i } className = { user.id === v.userId ? styles.main__content__messages__right :  styles.main__content__messages__left }>
        <span>{ v.content }</span>
        <span> { v.username } </span>
        <span> { moment(v.time).format('HH:mm:ss') }</span>
        </div>) }
      </div>
      <div className = { styles.main__content__input }>
        <textarea 
            autoFocus
            value = { inputValue } 
            onChange = { e =>  this.setState({ inputValue: e.target.value }) }
            onKeyPress = { (e) => this.handleKeypress(e) }
        />
        <button onClick = { this.handleSumit }>发送</button>
      </div>
    </div>
  }
}

export default Content