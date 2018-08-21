import * as models from './models/index'

(async () => {

  await models.User.sync()
  await models.Socket.sync()
  await models.Group.sync()
  await models.Friend.sync()
  await models.User_group.sync()
  await models.Message.sync()

})()