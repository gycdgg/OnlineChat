import { User } from '../models'
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
        ctx.session = {}
        ctx.session.id = id

      }
    }
  } catch(err) {
    console.log('err', err)
  }
  await next()
}
export  { normalizeResponse, checkAuth }