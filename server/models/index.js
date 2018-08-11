import User from './user'
import Socket from './socket'
import Friend from './friend'
import Message from './message'
import Group from './group'
import User_group from './user_group'

User.hasMany(Socket, { as: 'sockets', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })
Socket.belongsTo(User, { as: 'sockets', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })

User.hasMany(Friend, { as: 'friends', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })
Friend.belongsTo(User, { as: 'friends', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })


User.hasMany(Friend, { as: '_friends', foreignKey: '_user_id', onDelete: 'cascade', hooks: true })
Friend.belongsTo(User, { as: '_friends', foreignKey: '_user_id', onDelete: 'cascade', hooks: true })

User.hasMany(Message, { as: 'from_user', foreignKey: 'from', onDelete: 'cascade', hooks: true })
Message.belongsTo(User, { as: 'from_user', foreignKey: 'from', onDelete: 'cascade', hooks: true })


User.hasMany(Message, { as: 'to_user', foreignKey: 'to', onDelete: 'cascade', hooks: true })
Message.belongsTo(User, { as: 'to_user', foreignKey: 'to', onDelete: 'cascade', hooks: true })

Group.hasMany(Message, { as: 'messages', foreignKey: 'group_id', onDelete: 'cascade', hooks: true })
Message.belongsTo(Group, { as: 'messages', foreignKey: 'group_id', onDelete: 'cascade', hooks: true })

User.hasMany(User_group, { as: 'user_groups', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })
User_group.belongsTo(User, { as: 'user_groups', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })

Group.hasMany(User_group, { as: 'group_users', foreignKey: 'group_id', onDelete: 'cascade', hooks: true })
User_group.belongsTo(Group, { as: 'group_users', foreignKey: 'group_id', onDelete: 'cascade', hooks: true })

export {
  User,
  Socket,
  Friend,
  Message,
  User_group,
  Group
}