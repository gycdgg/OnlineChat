import { Group, User_group } from '../models'
import orm from '../models/orm'
class GroupController {
  /**
   * get group data and create items in table group and user_group
   * @param {object} data 
   */
  async create(data) {
    const t = await orm.transaction()
    const localTransaction = { transaction: t }
    try{
      const group  = await Group.create({ name: data.name, desc: data.desc }, localTransaction)
      const userArr = []
      data.user.forEach(v => {
        userArr.push({ user_id: v, group_id: group.id })
      })
      await User_group.bulkCreate(userArr, localTransaction)
      await t.commit()
    } catch(err) {
      console.log(`create group error: ${err}`)
      await t.rollback()
    }
  }
}

export default new GroupController()