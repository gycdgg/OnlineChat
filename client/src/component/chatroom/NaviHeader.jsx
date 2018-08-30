import React from 'react'
import styles from './styles.styl'
import _fetch from '$fetch'
import { Icon, message, Modal, Checkbox, Col, Row, Input } from 'antd'
import * as friendAction from '../../action/friend'
import * as userAction from '../../action/user'
import { logout } from '../../action/user'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import 'whatwg-fetch'

@connect(( user ) => ( user ), (dispatch) => ({
  get_friend_list: (...args) => dispatch(friendAction.get_friend_list(...args)),
  select_friend: (...args) => dispatch(friendAction.select_friend(...args)),
  logout: (...args) => dispatch(logout(...args)),
  create_group: (...args) => dispatch(friendAction.create_group(...args)),
  change_avatar: (...args) => dispatch(userAction.change_avatar(...args))
}))
class NaviHeader extends React.Component {
  
  static propTypes = {
    user: PropTypes.object.isRequired,
    get_friend_list: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    friends: PropTypes.object.isRequired,
    create_group: PropTypes.func.isRequired,
    select_friend: PropTypes.func.isRequired,
    change_avatar: PropTypes.func.isRequired
  }

  state = {
    value: '',
    searchResults: [],
    showPop: false,
    showModal: false,
    radioGroupValue: [],
    groupName: '',
    fileValue: ''
  }

  listener = (e) => {
    if(this.popRef && !this.popRef.contains(e.target) && !this.setRef.contains(e.target)) {
      this.setState({ showPop: false })
      document.body.removeEventListener('click', this.listener)
    }
  }

  openPop = () => {
    const { showPop } = this.state
    document.body.addEventListener('click', this.listener)
    this.setState({ showPop: !showPop })
  }

  handleAdd = (id) => {
    _fetch('/api/friends', {
      method: 'POST',
      body: {
        user_id: id
      }
    }).then(() => {
      this.setState({
        searchResults: [],
        value: ''
      })
      this.props.get_friend_list()
      message.success('添加好友成功')
    })
  }

  handleInputChange = (e) => {
    const { friends } = this.props
    this.setState({ value: e.target.value })
    e.target.value && _fetch(`/api/users?name=${e.target.value}`).then(res => {
      let _res = []
      res.map(v => {
        if(friends.list.find(_v => (_v.id === v.id) && (_v.type === 'friend'))) { 
          _res.push({ ...v, isFriend: true, type: 'friend' }) 
        } else {
          _res.push({ ...v, isFriend: false, type: 'friend' })
        }
      })
      console.log(_res)
      this.setState({ searchResults: _res })
    })
    !e.target.value && this.setState({ searchResults: [] })
  }

  showModal = () => {
    this.setState({
      showModal: true,
      showPop: false
    })
  }

  onSelectUser = (e) => {
    this.setState({ radioGroupValue: e })
  }

  handleOk = () => {
    const { groupName: name, radioGroupValue: user } = this.state
    this.props.create_group({ name, user: [ this.props.user.id, ...user ] })
    this.setState({
      showModal: false
    })
  }
  
  handleOpenFriendChat = (v) => {
    this.props.select_friend(v)
    this.setState({
      searchResults: []
    })
  }
  
  handleUpload = (e) => {
    const { user } = this.props
    let tmp = Object.assign({}, user)
    let formData = new FormData()
    console.log(e.target.file)
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e)  => {
      tmp.avatar = e.target.result
      this.props.change_avatar(tmp)
      this.setState({ showPop: false })
    }
    formData.append('file', file)
    fetch(`/api/uploads?type=avatar&&id=${user.id}`, {
      method: 'POST',
      body: formData
    }).then(() => {
      this.setState({ fileValue: '' })
    })
  }

  render() {
    const { user, friends } = this.props
    const { value, searchResults, showPop, showModal, radioGroupValue, groupName, fileValue } = this.state
    return <div className = { styles.naviHeader }>
    <div className = { styles.naviHeader__header }>    
      <div className = { styles.naviHeader__header__avatar }><img src = { user.avatar.length > 5 ? user.avatar : `/avatar/img${user.avatar}.jpg` }/></div>
      <div className = { styles.naviHeader__header__info }>{ user.username }</div>
      <div className = { styles.naviHeader__header__setting } onClick = { this.openPop } ref = { ref => this.setRef = ref }></div>
      { showPop ? <div className = { styles.naviHeader__header__pop } ref = { ref => this.popRef = ref }>
        <a onClick = { this.props.logout }><span  className = { styles.logout }></span>Log Out</a>
        <a><span  className = { styles.sound }></span>Sound Off</a>
        <a onClick = { this.showModal }><span  className = { styles.group }></span>Group Chat</a>
        <a>
          <span className = { styles.changeAvatar }> <input type = "file" id = "avatar" onChange = { this.handleUpload } value = { fileValue }/></span>Change Avatar 
        </a>
      </div> : null }
    </div>
    <Modal
        title = "建群"
        visible = { showModal }
        onOk = { this.handleOk }
        onCancel = { () => this.setState({ showModal: false }) }
        okText = "确认"
        cancelText = "取消"
    >
        <Input value = { groupName } required onChange = { (e) => this.setState({ groupName: e.target.value }) }/>
        <Checkbox.Group style = { { width: '100%' } } onChange = { this.onSelectUser } value = { radioGroupValue }>
    <Row>
      
      { friends.list.map((v, i) => v.type === 'friend' && <Col span = { 8 } key = { i }><Checkbox value = { v.id }>{ v.username }</Checkbox></Col>) }
    </Row>
  </Checkbox.Group>,
      </Modal>
    <div className = { styles.naviHeader__search }>
      <i className = { styles.naviHeader__search__icon }></i>
      <input value = { value }  className = { styles.naviHeader__search__input } onChange = { this.handleInputChange } placeholder = "Search"/>
      <div className = { searchResults.length ? styles.show : styles.hidden }>
      <div className = { styles.show__container }>
        {
          searchResults.map((v, i) => <div key = { i } className = { styles.show__container__item }>
            <div className = { styles.content__chatContact__avatar }>
              <img src = { user.avatar.length > 5 ? user.avatar : `/avatar/img${user.avatar}.jpg` }/>
            </div>
            <div className = { styles.item__info }>
          <div className = { styles.item__info__name }>{ v.username }</div>
          <div className = { styles.item__info__icon } >
            { v.isFriend ? 
            <Icon 
                type = "wechat" 
                style = { { fontSize: 18, textAlign: 'right', color: '#fff' } }
                onClick = { () => this.handleOpenFriendChat(v) }
            /> : <Icon type = "user-add" onClick = { () => this.handleAdd(v.id) } style = { { fontSize: 18, textAlign: 'right', color: '#fff' } }/> }
          </div>
          </div>
          </div>)
        }
      </div>
      </div>
    </div>
    </div>
  }
}

export default NaviHeader