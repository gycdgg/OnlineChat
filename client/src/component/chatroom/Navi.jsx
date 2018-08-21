import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NaviHeader from './NaviHeader'
import * as friendActions from '../../action/friend'
import * as messageActions from '../../action/message'
import avatarArr from '../../assets/index'

@connect(({ user, message, friends }) => ({ user, message, friends }), (dispatch) => ({
  get_friend_list: (...args) => dispatch(friendActions.get_friend_list(...args)),
  select_friend: (...args) => dispatch(friendActions.select_friend(...args)),
  init_message_list: (...args) => dispatch(messageActions.init_message_list(...args))
}))

class Navi extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    friends: PropTypes.object.isRequired,
    get_friend_list: PropTypes.func.isRequired,
    select_friend: PropTypes.func.isRequired,
    init_message_list: PropTypes.func.isRequired
  }

  // while initial page, get friend list first
  componentDidMount() {
    this.props.get_friend_list(),
    this.props.init_message_list()
  }

  lastMessage = (arr, id) => {
    const targetArr = arr.filter(v => v.from === id || v.to === id)
    const len = targetArr.length
    if(len >= 1) {
      return targetArr[len - 1].content
    }
    return null
  }
  render() {
    const { friends, message } = this.props
    const selectedId = friends.selected && friends.selected.id
    return <div className = { styles.main__navi }>
      <div className = { styles.header }>
        <NaviHeader/>
      </div>
      <div className = { styles.content }>
        {
          friends.list.map((v, i) => <div className = { styles.content__chatContact + ' ' + (selectedId === v.id ? styles.content__active : '') } onClick = { () => this.props.select_friend(v) } key = { i }>
          <div className = { styles.content__chatContact__avatar }>
            <img src = { avatarArr[v.avatar] }/>
            { v.unread ? <i className = { styles.content__chatContact__avatar__unread }>{ v.unread }</i> : null }
          </div>
          <div className = { styles.content__chatContact__info }>
            <div className = { styles.name }>{ v.username }</div>
            <div className = { styles.text }>{ this.lastMessage(message.list, v.id) }</div>
          </div>
          <div className = { styles.content__chatContact__text }>
          </div>
        </div>)
        }
      </div>
    </div>
  }
}

export default Navi