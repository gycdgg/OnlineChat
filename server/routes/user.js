import { User, Socket } from '../models'
import { signToken } from '../util'

class UserController {
  async _get(ctx) {
    return User.findById(ctx.session.id)
  }

  async create(ctx) {
    console.log('login222222222222', ctx.socket.id)
    const { userName: username, password, action } = ctx.request.body
    if(action === 'login') {
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
          await Socket.update(
            { user_id: user.id },
            {
              where: {
                _id: ctx._socket.id
              }
            }
          )
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
    } else {
      let count = await User.count({
        where: { username, is_deleted: false }
      })
      if(count > 0) {
        ctx.status = 500
        ctx.body = {
          message: 'failed'
        }
      } else {
        let createUser = await User.create({
          username,
          password
        })
        ctx.status = 200
        ctx.body = {
          data: createUser,
          message: 'Success'
        }
      }
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