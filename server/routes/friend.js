import { User, Friend } from '../models'

class FriendController {
  async _get(ctx) {
    return Friend.findAndCountAll({ where: {
      $or: [
        { user_id: ctx.session.id },
        { _user_id: ctx.session.id }
      ]
    },
    include: [{}]
    })
  }

  async create(ctx) {
    const { user_id: _user_id } = ctx.request.body
    let friend = await Friend.findOne({
      where: {
        $or: [
          {
            user_id: ctx.session.id,
            _user_id
          },
          {
            user_id: _user_id,
            _user_id: ctx.session.id,
          }
        ]
      }
    })
    if(friend) {
      ctx.status = 403
      ctx.body = {
        message: 'they are friends',
        data: friend }
    } else {
      friend = await friend.create({
        user_id: ctx.session.id,
        _user_id: user_id
      })
      ctx.status = 200
      ctx.body = {
        message: 'add friend success',
        data: friend
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

export default new FriendController()