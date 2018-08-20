import io from 'socket.io-client'
console.log(process.env.NODE_ENV)
const socket = new io(process.env.NODE_ENV === 'development' ? 'http://localhost:3001':'')

export default socket