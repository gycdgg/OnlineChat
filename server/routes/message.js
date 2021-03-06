import { User, Socket, Message, User_group } from '../models'
import { signToken } from '../util'

class MessageController {
  async _get(ctx) {
    const userId = ctx.session.id
    const groups = await User_group.findAll({
      where: {
        user_id: userId
      }
    })
    const groupsArr = groups.map(v => v.group_id)
    let msgArr = []
    const messages = await Message.findAll({
      where: {
        $or: [
          { from: userId },
          { to: userId },
          { group_id: {
            $in: groupsArr
          } }
        ]
      },
      include: [
        { model: User, as: 'from_user' },
      ],
      order: [ 'id' ]
    })
    messages.forEach(v => {
      let tmp = {}
      tmp.from = v.from
      tmp.to = v.to
      tmp.username = v.from_user.username
      tmp.avatar = v.from_user.avatar
      tmp.time = v.createdAt
      tmp.group_id = v.group_id
      tmp.content = v.content
      msgArr.push(tmp)
    })
    return msgArr
  }

  async create(ctx) {
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

  //user search other user
  async find(ctx) {
    const { name } = ctx.query
    return User.findAll({
      where: {
        username: {
          $like: '%' + name + '%'
        },
        id: {
          $ne: ctx.session.id
        }
      }
    })
  }
}

export default new MessageController()