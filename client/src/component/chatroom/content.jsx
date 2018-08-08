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
    console.log(this.state.inputValue.trim() === '')
    if(this.state.inputValue.trim() === '') return
    const message = { username: user.username, userId: user.id, time: new Date(), content: this.state.inputValue }
    this.props.sendMessage(message)
    this.setState({ inputValue: '' })
  }

  handleKeypress = (e) => {
    if(window.event.keyCode === 13 && !window.event.shiftKey) {
      e.preventDefault()
      this.handleSumit()
    }
  }

  // while send message scroll to bottom
  getDom = (e) => {
    e && (e.scrollTop = e.scrollHeight)
  }

  /**
  * @param arr
  * if time space > 1min, show time
  */
  showTime = (v, i, arr) => {
    if(i === 1) return false
    if(i === 0) return true
    return moment(v.time) - moment(arr[i - 1].time) > 60000
  }
  
  render() {
    const { inputValue } = this.state
    const { message, user } = this.props
    return <div className = { styles.main__content }>
      <div className = { styles.main__content__title }>
        <div className = { styles.main__content__title__text }>test title</div>
      </div>
      <div className = { styles.main__content__messages } ref = { (e) => this.getDom(e) }>
        <div className = { styles.scrollWrapper }>
          { message.list.map((v, i, arr) => <div key = { i } className = { user.id === v.userId ? styles.main__content__messages__right :  styles.main__content__messages__left }>
          { this.showTime(v, i, arr) ? <div className = { styles.main__content__messages__time }> <span>{ moment(v.time).format('HH:mm:ss') }</span></div> : null }
          <span className = { `${styles.main__content__messages__item} ${styles.content_left}` }><pre>{ v.content }</pre></span>
          <span className = { `${styles.main__content__messages__name} ${styles.name_left}` }> { v.username && v.username.slice(0, 2).toUpperCase() } </span>
          </div>) }
        </div>
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