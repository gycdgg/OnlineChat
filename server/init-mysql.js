import * as models from './models/index'

(async () => {
  await models.User.sync()
  await models.Socket.sync()
  await models.User.create({
    username: 'edguan',
    password: '123456',
    is_deleted: false
  })

  await models.User.create({
    username: 'sandy',
    password: '123456',
    is_deleted: false
  })

  await models.User.create({
    username: 'wenqian',
    password: '123456',
    is_deleted: false
  })
})()