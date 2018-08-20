import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import IO from 'socket.io'
import http from 'http'
import Static from 'koa-static'
import path, { dirname } from 'path'
import { checkAuth, getSocketId } from './middleware'
import routes from './routes'
import { Socket, Message } from './models'
let app = new Koa()
const server = http.createServer(app.callback())

const io = IO(server)

let _socket
io.on('connection', async (socket) => {
  console.log('>>connect to socket:', socket.id )
  _socket = socket
  await Socket.create({
    _id: socket.id
  })
  socket.on('disconnect', async () => {
    console.log('>>enter disconnect')
    await Socket.destroy({
      where: {
        _id: socket.id
      }
    })
  })
})

io.use( async (socket, next) => {
  socket.on('message', async (data) => {
    const { from, to } = data
    await Message.create(data)
    console.log('message data', data)
    const socketIds = await getSocketId(to)
    const _socketIds = await getSocketId(from)
    if(socketIds.length >= 1) {
      socketIds.forEach(socketId => {
        console.log('from : to',from, to, socketId, socketIds)
        io.to(socketId).emit('message', data)
      })
    }
    _socketIds.forEach((_socketId) => io.to(_socketId).emit('message', data))
  })
  await next()
})
app.use( Static(path.join(__dirname, '../client/dist'), {
  maxAge: 365*24*60*60
}))
app.use(convert(logger()))
app.use(bodyParser())
// insert socket into ctx
app.use(async (ctx, next) => {
  ctx._socket = _socket
  ctx.io = io
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})
app.use( checkAuth ())
  .use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
  .use(routes.routes(), routes.allowedMethods())
  // .use(routes.routes(), routes.allowedMethods())
  .on('error', (error, ctx) => {
    console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
    console.log('server error:' + error)
  })
  
server.listen(3001)