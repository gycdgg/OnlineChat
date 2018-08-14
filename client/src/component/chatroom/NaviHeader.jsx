import React from 'react'
import styles from './styles.styl'
import fetch from '$fetch'
import * as friendAction from '../../action/friend'
import { connect } from 'react-redux'

@connect(( user ) => ( user ), (dispatch) => ({
  get_friend_list: (...args) => dispatch(friendAction.get_friend_list(...args)) 
}))
class NaviHeader extends React.Component {
  
  state = {
    value: null
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
    return <div className = { styles.naviHeader }>
      <input value = { this.state.value } onChange = { (e) => this.setState({ value: e.target.value }) }/>
      <button onClick = { this.handleAdd }>添加</button>
    </div>
  }
}

export default NaviHeader