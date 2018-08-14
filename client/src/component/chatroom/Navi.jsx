import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import socket from '../../socket'
import NaviHeader from './NaviHeader'
import * as friendActions from '../../action/friend'

@connect(({ user, message, friends }) => ({ user, message, friends }), (dispatch) => ({
  get_friend_list: (...args) => dispatch(friendActions.get_friend_list(...args)),
  select_friend: (...args) => dispatch(friendActions.select_friend(...args))
}))

class Navi extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    friends: PropTypes.array.isRequired,
    get_friend_list: PropTypes.func.isRequired,
    select_friend: PropTypes.func.isRequired
  }

  // while initial page, get friend list first
  componentDidMount() {
    this.props.get_friend_list()
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
          friends.list.map((v, i) => <div className = { styles.content__chatContact } onClick = { () => this.props.select_friend(v) } key = { i }>
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