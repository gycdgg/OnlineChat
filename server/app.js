import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import IO from 'socket.io'
import http from 'http'
import { checkAuth } from './middleware'
import routes from './routes'

let app = new Koa()
const server = http.createServer(app.callback())

const io = IO(server)

// io.sockets.on('connection', (socket) => {
//   console.log( 'success', socket.id)
//   socket.on('message', async (data) => {
//     console.log(socket.id)
//     io.emit('message', data)
//   })

//   socket.on('test', (data) => {
//     console.log(data)
//   })
//   socket.emit('test', 'server account')
// })

/**
 * @todo checkAuth
 */
io.use(async (ctx, next) => {
  console.log(ctx.request.headers.cookie)
  await next()
})

io.use( async (ctx, next) => {
  ctx.on('message', async (data) => {
    io.emit('message', data)
  })
  await next()
})


app.use(convert(logger()))
app.use(bodyParser())
app.use( checkAuth ())

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
  .use(routes.routes(), routes.allowedMethods())
  // .use(routes.routes(), routes.allowedMethods())
  .on('error', (error, ctx) => {
    console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
    console.log('server error:' + error)
  })
  
server.listen(3001)