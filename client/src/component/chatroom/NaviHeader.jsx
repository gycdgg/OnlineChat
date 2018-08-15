import React from 'react'
import styles from './styles.styl'
import fetch from '$fetch'
import * as friendAction from '../../action/friend'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
@connect(( user ) => ( user ), (dispatch) => ({
  get_friend_list: (...args) => dispatch(friendAction.get_friend_list(...args)) 
}))
class NaviHeader extends React.Component {
  
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  state = {
    value: ''
  }

  handleAdd = () => {
    fetch('/api/friends', {
      method: 'POST',
      body: {
        user_id: this.state.value
      }
    }).then((res) => {
      console.log(res)
      message.success('添加好友成功')
    })
  }
  
  render() {
    const { user } = this.props
    return <div className = { styles.naviHeader }>
    <div className = { styles.naviHeader__header }>    
      <div className = { styles.naviHeader__header__avatar }><span>{ user.username.slice(0, 2).toUpperCase() }</span></div>
      <div className = { styles.naviHeader__header__info }>{ user.username }</div>
    </div>
    <div className = { styles.naviHeader__search }>
      <i className = { styles.naviHeader__search__icon }></i>
      <input value = { this.state.value }  className = { styles.naviHeader__search__input } onChange = { (e) => this.setState({ value: e.target.value }) }/>
    </div>
    </div>
  }
}

export default NaviHeader