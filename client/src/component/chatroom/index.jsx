import React from 'react'
import styles from './styles.styl'
import Navi from './Navi'
import Content from './Content'

class Main extends React.Component {
  render() {
    return <div className = { styles.main }> 
      <Navi/>
      <Content/>
    </div>
  }
}

export default Main