import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import IO from 'socket.io'
import http from 'http'


let app = new Koa()
const server = http.createServer(app.callback())

const io = IO(server)

io.sockets.on('connection', (socket) => {
  console.log( 'success', socket.id)
  socket.on('test', async (data) => {
    console.log(data)
  })
  socket.emit('test', 'server account')
})

app.use(convert(logger()))
app.use(bodyParser())
app.use(async (ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})
  .use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
  // .use(routes.routes(), routes.allowedMethods())
  .on('error', (error, ctx) => {
    console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
    console.log('server error:' + error)
  })
  
server.listen(3001)