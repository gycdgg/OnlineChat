import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import socket from '../../socket'
import NaviHeader from './NaviHeader'
import * as friendActions from '../../action/friend'

const friends = [
  { id: 3, username: 'wenqian' },
  { id: 4, username: 'rooby' }
]
@connect(({ user, message, friends }) => ({ user, message, friends }), (dispatch) => ({
  get_friend_list: (...args) => dispatch(friendActions.get_friend_list(...args))
}))

class Navi extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    friends: PropTypes.array.isRequired,
    get_friend_list: PropTypes.func.isRequired
  }

  // get friend list
  componentDidMount() {
    this.props.get_friend_list()
  }
  /**
   * while switch tab
   * join a new group
   */
  handleClick = (text) => {
    socket.emit('createGroup', { groupName: text }, (data) => {
      console.log('get data from backend', data)
    })
  }

  
  render() {
    console.log(this.props.friends, 222222)
    const { friends } = this.props
    return <div className = { styles.main__navi }>
      <div className = { styles.header }>
        <NaviHeader/>
      </div>
      <div className = { styles.content }>
        {
          friends.map((v, i) => <div className = { styles.content__chatContact } onClick = { () => this.handleClick('aaa') } key = { i }>
          <div className = { styles.content__chatContact__avatar }></div>
          <div className = { styles.content__chatContact__info }>
            <div className = { styles.name }>{ v.username }</div>
            <div className = { styles.text }>{ v.id }</div>
          </div>
          <div className = { styles.content__chatContact__ext }>
          </div>
        </div>)
        }
      </div>
    </div>
  }
}

export default Navi