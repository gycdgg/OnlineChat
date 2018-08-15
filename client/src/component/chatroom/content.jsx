import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import * as messageActions from '../../action/message'
import PropTypes from 'prop-Types'
import moment from 'moment'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/messenger.json'
import { Picker } from 'emoji-mart'
@connect(({ message, user, friends }) => ({ message, user, friends }), (dispatch) => ({
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
    friends: PropTypes.object.isRequired,
    getMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired
  }

  state = {
    inputValue: '',
    showPicker: false
  }

  componentDidMount() {
    // register a socket to receive message
    this.props.getMessage()
  }

  handleSumit = () => {
    const { user, friends } = this.props
    console.log(this.state.inputValue.trim() === '')
    if(this.state.inputValue.trim() === '' || friends.selected.id == false) return
    const message = { username: user.username, from: user.id, to: friends.selected.id, time: new Date(), content: this.state.inputValue }
    this.props.sendMessage(message)
    this.setState({ inputValue: '' })
  }

  // fix enter useless issue on firefox
  handleKeypress = (e) => {
    const event = window.event || e
    if((event.keyCode === 13 || event.which === 13) && !event.shiftKey) {
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
  
  handleEmojiSelect = (e) => {
    console.log('e', e)
    this.setState({ showPicker: false })
  }
  render() {
    console.log(this.state, 'state')
    const { inputValue, showPicker } = this.state
    const { message, user, friends } = this.props
    const hasSelected = !!friends.selected.id
    const friendMessage = message.list.filter(v => {
      return (user.id === v.from && friends.selected.id === v.to) || (user.id === v.to && friends.selected.id === v.from) 
    })
    return <div className = { styles.main__content }>
    <pre>
    </pre>
      <div className = { styles.main__content__title }>
      <i className = "em em-baby"></i>
        <div className = { styles.main__content__title__text }>{ friends.selected.username || null } </div>
      </div>
      { hasSelected ? null : <div className = { styles.main__content__notSelect }>
        <div className = { styles.main__content__notSelect__container }>
          <i></i>
          <p>No chats selected</p>
        </div>
      </div> }
      { hasSelected ? <div className = { styles.main__content__messages } ref = { (e) => this.getDom(e) }>
        <div className = { styles.scrollWrapper }>
          { friendMessage.map((v, i, arr) => <div key = { i } className = { user.id === v.from ? styles.main__content__messages__right :  styles.main__content__messages__left }>
          { this.showTime(v, i, arr) ? <div className = { styles.main__content__messages__time }> <span>{ moment(v.time).format('HH:mm:ss') }</span></div> : null }
          <span className = { `${styles.main__content__messages__item} ${styles.content_left}` }><pre>{ v.content }</pre></span>
          <span className = { `${styles.main__content__messages__name} ${styles.name_left}` }> { v.username && v.username.slice(0, 2).toUpperCase() } </span>
          </div>) }
        </div>
      </div> : null }
      { hasSelected ? <div className = { styles.main__content__input }>
        <div className = { styles.main__content__input__toolbar }>
          <div className = { styles.face } onClick = { () => this.setState({ showPicker: true }) }>
          { showPicker ? <div
              tabIndex = { 1 }
              onBlur = { () => { 
                this.setState({ showPicker: false })
              } }
              className = { styles.tool }
                         >
          <Picker data = { data } showPreview = { false } showSkinTones = { false } onSelect = { (e) => this.handleEmojiSelect(e) }/>
          </div> : null }
          </div>
        </div>
        <textarea 
            autoFocus
            value = { inputValue }
            onChange = { e =>  this.setState({ inputValue: e.target.value }) }
            onKeyPress = { (e) => this.handleKeypress(e) }
        />
        <button onClick = { this.handleSumit } className = { styles.submit }>发送</button>
      </div> : null }
    </div>
  }
}

export default Content