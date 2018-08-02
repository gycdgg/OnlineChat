import React from 'react'
import IO from 'socket.io-client'
// const socket = new IO('http://localhost:9090/test', {})
// socket.on('connect', () => {
//   console.log(111)
// })
class Chatroom extends React.Component {
  componentDidMount() {
    console.log(111)
    fetch('/api/test', {
      method: 'GET'
    })
  }

  render() {
    return <div>TEST</div>
  }
}

export default Chatroom