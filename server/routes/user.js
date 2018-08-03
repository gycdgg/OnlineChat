import { User } from '../models'
import { signToken } from '../util'

class UserController {
  async _get(ctx) {
    return User.findById(ctx.session.id)
  }

  async create(ctx) {
    const { userName: username, password } = ctx.request.body
    const user = await User.findOne({
      where: {
        username, password, is_deleted: false
      }
    })
    // if user found, sign token and set cookie to browser
    try{      
      if(user) {
        const { token, expiresIn } = signToken(user)
        ctx.cookies.set('user_id', token, {
          overwrite: true,
          maxAge: expiresIn
        })
        ctx.status = 200
        ctx.body = {
          data: user,
          message: 'Success'
        }
      } else {
        ctx.status = 403
        ctx.body = {
          message: 'Failure'
        }
      }
    }catch(err) {
      console.log('err', err)
    }
  }

  async update(ctx) {
    const { password } = ctx.request.body
    return User.update({ password: password }, {
      where: {
        id: ctx.session.id
      }
    })
  }

  async _delete(ctx) {
    let data =  await User.findById(ctx.session.id)
    if(data) {
      ctx.cookies.set('user_id', '') 
    }
    return data
  }
}

export default new UserController()