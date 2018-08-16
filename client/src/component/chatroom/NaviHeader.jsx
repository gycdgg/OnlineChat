import React from 'react'
import styles from './styles.styl'
import fetch from '$fetch'
import { Icon, message } from 'antd'
import * as friendAction from '../../action/friend'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
@connect(( user ) => ( user ), (dispatch) => ({
  get_friend_list: (...args) => dispatch(friendAction.get_friend_list(...args)) 
}))
class NaviHeader extends React.Component {
  
  static propTypes = {
    user: PropTypes.object.isRequired,
    get_friend_list: PropTypes.func.isRequired
  }
  state = {
    value: '',
    searchResults: []
  }

  handleAdd = (id) => {
    fetch('/api/friends', {
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
    this.setState({ value: e.target.value })
    e.target.value && fetch(`/api/users?name=${e.target.value}`).then(res => {
      this.setState({ searchResults: res })
    })
    !e.target.value && this.setState({ searchResults: [] })
  }
  render() {
    const { user } = this.props
    const { value, searchResults } = this.state
    return <div className = { styles.naviHeader }>
    <div className = { styles.naviHeader__header }>    
      <div className = { styles.naviHeader__header__avatar }><span>{ user.username.slice(0, 2).toUpperCase() }</span></div>
      <div className = { styles.naviHeader__header__info }>{ user.username }</div>
    </div>
    <div className = { styles.naviHeader__search }>
      <i className = { styles.naviHeader__search__icon }></i>
      <input value = { value }  className = { styles.naviHeader__search__input } onChange = { this.handleInputChange } placeholder = "Search"/>
      <div className = { searchResults.length ? styles.show : styles.hidden }>
      <div className = { styles.show__container }>
        {
          searchResults.map((v, i) => <div key = { i } className = { styles.show__container__item }>
            <div className = { styles.content__chatContact__avatar }>
              { v.username.slice(0, 2).toUpperCase() }
            </div>
            <div className = { styles.item__info }>
          <div className = { styles.item__info__name }>{ v.username }</div>
          <div className = { styles.item__info__icon } onClick = { () => this.handleAdd(v.id) }><Icon type = "user-add" style = { { fontSize: 18, textAlign: 'right', color: '#fff' } }/></div>
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