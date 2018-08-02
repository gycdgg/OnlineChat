import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import IO from 'koa-socket'
let app = new Koa()
const io = new IO({
  ioOptions: {
    pingTimeout: 10000,
    pingInterval: 5000,
  }
})

io.attach(app)
app.io.on('connection', async (ctx) => {
  console.log(`>>>connection ${ctx.socket.id} ${ctx.socket.request.remoteAddress}success`)
  // todo
})

app.io.on('disconnect', async (ctx) => {
  console.log(`  >>>> disconnect ${ctx.socket.id}`)
  await Socket.remove({
    id: ctx.socket.id,
  })
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
  
export default app