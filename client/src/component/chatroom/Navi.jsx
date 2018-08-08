import React from 'react'
import styles from './styles.styl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

@connect(({ user, message }) => ({ user, message }))

class Navi extends React.Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  }
  render() {
    return <div className = { styles.main__navi }>
      <div className = { styles.header }>this is header</div>
      <div className = { styles.content }>
        <div className = { styles.content__chatContact }>
          <div className = { styles.content__chatContact__avatar }></div>
          <div className = { styles.content__chatContact__info }>
            <div className = { styles.name }>test user</div>
            <div className = { styles.text }>test text</div>
          </div>
          <div className = { styles.content__chatContact__ext }>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Navi