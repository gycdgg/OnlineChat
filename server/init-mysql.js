import * as models from './models/index'

(async () => {
  await models.User.sync()
  await models.User.creat({
    username: 'edguan',
    password: '123456',
    is_deleted: false
  })

  await models.User.create({
    username: 'sandy',
    password: '123456',
    is_deleted: true
  })
})()