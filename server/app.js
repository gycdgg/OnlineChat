import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import IO from 'socket.io'
import http from 'http'
import Static from 'koa-static'
import path from 'path'
import { checkAuth, getSocketId, createGroup } from './middleware'
import routes from './routes'
import send from 'koa-send'
import { Socket, Message, Group } from './models'
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
    if(data.group_id) {
      await Message.create(Object.assign({}, data, { to: null }))
      const groupDetail = await Group.findById(data.group_id)
      // io.sockets.in(groupDetail.name + groupDetail.id).emit('message', data)
      socket.broadcast.to(groupDetail.name + groupDetail.id).emit('message', data)
    } else {
      await Message.create(data)
      const socketIds = await getSocketId(to)
      if(socketIds.length >= 1) {
        socketIds.forEach(socketId => {
          io.to(socketId).emit('message', data)
        })
      }
      // while send message, exclude self
      // const _socketIds = await getSocketId(from)
      // _socketIds.forEach((_socketId) => io.to(_socketId).emit('message', data))
    }
  })
  await next()
})

io.use( async (socket, next) => {
  socket.on('createGroup', async (data) => {
    const { name, user, desc } = data
    const groupDetail = await createGroup({ name, desc, user })
    user.forEach( async v => {
      const socketIds = await getSocketId(v)
      socketIds.forEach(socketId => {
        io.to(socketId).emit('invite', data)
        io.to(socketId).emit('joinSuccess', {
          id: groupDetail.id,
          username: name,
          desc,
          type: 'group',
          avatar: 21,
          unread: 0
        })
      })
    })
  })
  await next()
})

io.use( async (socket, next) => {
  socket.on('join', async (data) => {
    console.log('join', data)
    socket.join(data.name || data.username + data.id)
  })
  await next()
})
app.use( Static(path.join(__dirname, '../client/dist'), {
  maxAge: 365 * 24 * 60 * 60
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

app
  .use(async (ctx, next) => {
    if(ctx.path.startsWith('/static')) {
      let rest = ctx.path.replace('/static', '')
      await send(ctx, rest, { root: path.join(__dirname, './static') })
    }
    await next()
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