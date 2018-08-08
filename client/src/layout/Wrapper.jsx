import React from 'react'
import styles from './styles.styl'
import 'antd/dist/antd.less'
import { withRouter } from 'react-router'
import { Button, message } from 'antd'
import PropTypes from 'prop-types'


@withRouter
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    router: PropTypes.object.isRequired
  }
  componentDidMount() {
    fetch('/test/111')
  }
  handleClick = () => {
    fetch('/api/admin/session', {
      method: 'DELETE'
    }).then(() => {
      this.props.router.push('login')
    }).catch(err => {
      console.log(err)
      message.error('登出失败')
    })
  }
  
  render() {
    return <div className = { styles.container }>
      <div className = { styles.container__header }>
      </div>
      <div className = { styles.container__main }>
        { this.props.children }
      </div>
      <div className = { styles.container__footer }>All rights Reserved by Edmond Guan</div>
    </div>
  }
}

export default Layout