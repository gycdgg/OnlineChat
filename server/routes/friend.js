import { User, Friend } from '../models'
import user from './user'

class FriendController {
  async _get(ctx) {
    // return Friend.findAll({ where: {
    //   $or: [
    //     { user_id: ctx.session.id },
    //     { _user_id: ctx.session.id }
    //   ]
    // },
    // include: [
    //   { model: User, as: '_friends',  attributes: [ 'id', 'username' ] },
    //   { model: User, as: 'friends', attributes: [ 'id', 'username' ] },
    // ]
    // })
    const userArr = await User.findOne({
      where: { id: ctx.session.id },
      include: [
        { model: Friend, as: '_friends', include: [{ model: User, as: 'friends' }] },
        { model: Friend, as: 'friends', include: [{ model: User, as: '_friends' }] },
      ]
    })
    let friendsArr = []
    if(userArr) {
      userArr.friends.forEach(v => {
        v._friends && friendsArr.push({ id: v._friends.id, username: v._friends.username })
      })
      userArr._friends.forEach(v => {
        v.friends && friendsArr.push({ id: v.friends.id, username: v.friends.username })
      })
    }
    return friendsArr
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
      friend = await Friend.create({
        user_id: ctx.session.id,
        _user_id: _user_id
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