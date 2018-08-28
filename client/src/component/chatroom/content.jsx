import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import * as messageActions from '../../action/message'
import PropTypes from 'prop-Types'
import moment from 'moment'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/messenger.json'
import { Picker, Emoji, NimbleEmojiIndex  } from 'emoji-mart'
import 'whatwg-fetch'

let emojiIndex = new NimbleEmojiIndex(data)
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
    //this.props.friends.selected && this.props.friends.selected.type === 'group' && this.getGroupUser()
    this.props.getMessage()
  }

  // getGroupUser = () => {

  // }

  handleSumit = () => {
    const { user, friends } = this.props
    if(this.state.inputValue.trim() === '' || friends.selected.id == false) return
    const message = { username: user.username, avatar: user.avatar, from: user.id, to: friends.selected.id, time: new Date(), content: this.state.inputValue }
    if( friends.selected.type === 'group') {
      Object.assign(message, { group_id: friends.selected.id })
    }
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
    this.setState({ inputValue: this.state.inputValue + `EMJ${e.id}EMJ` })
    this.setState({ showPicker: false })
  }

  emjRender = () => {
    const value = this.state.inputValue
    const arr = value.split('EMJ')
    return arr.reduce((pre, cur, index) => {
      if(index % 2 === 0) {
        return pre + cur
      } else {
        return pre + emojiIndex.search(cur).filter(v => v.id = cur)[0].native
      }
    }, '')
  }

  handleShowPicker = () => {
    const { showPicker } = this.state
    document.body.addEventListener('click', this.eventListener)
    this.setState({ showPicker: !showPicker })
  }
  
  eventListener = (e) => {
    if(this.pickerRef && !this.pickerRef.contains(e.target) && !this.faceRef.contains(e.target)) {
      this.setState({ showPicker: false })
      document.body.removeEventListener('click', this.listener)
    }
  }

  // only group chat should show user list
  showUser = () => {
    const shouldShow = this.props.friends.selected && this.props.friends.selected.type === 'group'
  }

  handleUpload = () => {
    const { user, friends } = this.props
    let formData = new FormData()
    let file = this.file.files[0]
    formData.append('file', file)
    console.time('upload')
    fetch('/api/uploads', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      console.timeEnd('upload')
      const message = { username: user.username, avatar: user.avatar, from: user.id, to: friends.selected.id, time: new Date(), content: `file${res.url}file` }
      if( friends.selected.type === 'group') {
        Object.assign(message, { group_id: friends.selected.id })
      }
      this.props.sendMessage(message)
    })
  }

  isFile = (str) => str.startsWith('file') && str.endsWith('file')
  render() {
    const { showPicker } = this.state
    const { message, user, friends } = this.props
    const hasSelected = !!friends.selected.id
    const isGroup = friends.selected.type === 'group'
    let friendMessage = message.list.filter(v => {
      return (v.group_id == null) && ((user.id === v.from && friends.selected.id === v.to) || (user.id === v.to && friends.selected.id === v.from))
    })
    if(isGroup) {
      friendMessage = message.list.filter(v => v.group_id === friends.selected.id)
    } 
    return <div className = { styles.main__content }>
      <div className = { styles.main__content__title }>
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
          <span className = { `${styles.main__content__messages__item} ${styles.content_left}` }><pre>{ this.isFile(v.content) ? <img src = { v.content.split('file')[1] }/> :  v.content.split('EMJ').map((v, i) => i % 2 ? <Emoji emoji = { { id: v, skin: 3 } } size = { 16 } /> : v) }</pre></span>
          <span className = { `${styles.main__content__messages__name} ${styles.name_left}` }><img src = { `/avatar/img${v.avatar}.jpg` }/></span>
          </div>) }
        </div>
      </div> : null }
      { hasSelected ? <div className = { styles.main__content__input }>
        <div className = { styles.main__content__input__toolbar }>
          <div className = { styles.face } onClick = { this.handleShowPicker } ref = { ref => this.faceRef = ref }></div>
          { showPicker ? <div
              ref = { ref => this.pickerRef = ref }
              className = { styles.tool }
                         >
          <Picker data = { data } showPreview = { false } className = { styles.smart } showSkinTones = { false }
              onSelect = { (e) => this.handleEmojiSelect(e) }
          />
          </div> : null }
          <div className = { styles.file } >
            <input type = "file" onChange = { this.handleUpload } ref = { ref => this.file = ref }/>
          </div>
        </div>
        <textarea 
            autoFocus
            value = { this.emjRender() }
            onChange = { e =>  this.setState({ inputValue: e.target.value }) }
            onKeyPress = { (e) => this.handleKeypress(e) }
        />
        <button onClick = { this.handleSumit } className = { styles.submit }>发送</button>
      </div> : null }
    </div>
  }
}

export default Content