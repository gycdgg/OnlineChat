import { User, Orm, User_group, Group, Socket } from '../models'
import { verifyToken } from '../util'
/**
 * normalize response
 * for admin api, should be authed
 * @param {function} fn
 * @return {function} asnyc
 */
const normalizeResponse = (fn) => async (ctx, next) => {
  if(!(ctx.session && ctx.session.id)) {
    ctx.status = 403
    ctx.body = {
      name: 'unauthortized',
      message: 'user or client unauthortized'
    }
    return
  }

  try{
    let data = await fn(ctx, next)
    ctx.status = 200
    ctx.body = {
      data,
      message: 'Success'
    }
  }catch(e) {
    ctx.status = 500
    ctx.body = {
      name: 'Server error',
      message: 'An Unexpected condition was encountered in the server and no more specific message is suitable'
    }
    console.log(e)
  }
}

/**
 * set ctx.decoded while admin user login
 * @param {function} fn
 * @return {function} asnyc
 * make sure the id exists and the used has not been deleted
 */
const checkAuth = () => async (ctx, next) => {
  try{
    const token = await verifyToken(ctx)
    let id = token && token.user_id
    if (id) {
      let userInfo = await User.findById(id)
      if(userInfo) {
        let socketDetail = await Socket.findOne({
          where: {
            user_id: id
          }
        })
        if(!(socketDetail && socketDetail._id)) {
          await Socket.update(
            { user_id: userInfo.id },
            {
              where: {
                _id: ctx._socket.id
              }
            }
          )
        }
        ctx.session = {}
        ctx.session.id = id

      }
    }
  } catch(err) {
    console.log('err', err)
  }
  await next()
}

/**
 * get socketid by user_id
 * one user can have serveral socket_id
 */
const getSocketId = async (id) => {
  let sockets = await Socket.findAll({
    where: { user_id: id }
  })
  return sockets.map(socket => socket && socket._id)
}

/**
 * 
 * @param {object} data 
 */
const  createGroup = async (data) => {
  const t = await Orm.transaction()
  const localTransaction = { transaction: t }
  try{
    const group  = await Group.create({ name: data.name, desc: data.desc }, localTransaction)
    const userArr = []
    data.user.forEach(v => {
      userArr.push({ user_id: v, group_id: group.id })
    })
    await User_group.bulkCreate(userArr, localTransaction)
    await t.commit()
    return group
  } catch(err) {
    console.log(`create group error:${err}`)
  }
}

export  { normalizeResponse, checkAuth, getSocketId, createGroup }