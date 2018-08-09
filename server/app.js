import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import IO from 'socket.io'
import http from 'http'
import { checkAuth } from './middleware'
import routes from './routes'
import { Socket } from './models'
let app = new Koa()
const server = http.createServer(app.callback())

const io = IO(server)

let _socket
io.sockets.on('connection', async (socket) => {
  _socket = socket
  await Socket.create({
    _id: socket.id
  })
})

io.sockets.on('disconnect', async (socket) => {
  await Socket.destroy({
    where: {
      _id: socket.id
    }
  })
})

app.use(convert(logger()))
app.use(bodyParser())
app.use( checkAuth ())
// insert socket into ctx
app.use(async (ctx, next) => {
  ctx._socket = _socket
  ctx.io = io
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})
  .use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(ctx._socket.id, 'logs')
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
  .use(routes.routes(), routes.allowedMethods())
  // .use(routes.routes(), routes.allowedMethods())
  .on('error', (error, ctx) => {
    console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
    console.log('server error:' + error)
  })
  
server.listen(3001)