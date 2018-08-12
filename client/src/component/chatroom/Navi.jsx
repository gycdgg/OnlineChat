import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import socket from '../../socket'
const friends = [
  { id: 3, username: 'wenqian' },
  { id: 4, username: 'rooby' }
]
@connect(({ user, message }) => ({ user, message }))

class Navi extends React.Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
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
    return <div className = { styles.main__navi }>
      <div className = { styles.header }>this is header</div>
      <div className = { styles.content }>
        <div className = { styles.content__chatContact } onClick = { () => this.handleClick('aaa') }>
          <div className = { styles.content__chatContact__avatar }></div>
          <div className = { styles.content__chatContact__info }>
            <div className = { styles.name }>test user1111</div>
            <div className = { styles.text }>test text1111</div>
          </div>
          <div className = { styles.content__chatContact__ext }>
          </div>
        </div>

        <div className = { styles.content__chatContact } onClick = { () => this.handleClick('bbb') }>
          <div className = { styles.content__chatContact__avatar }></div>
          <div className = { styles.content__chatContact__info }>
            <div className = { styles.name }>test user1111</div>
            <div className = { styles.text }>test text1111</div>
          </div>
          <div className = { styles.content__chatContact__ext }>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Navi