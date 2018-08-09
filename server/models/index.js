import User from './user'
import Socket from './socket'

User.hasMany(Socket, { as: 'sockets', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })
Socket.belongsTo(User, { as: 'sockets', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })

export {
  User,
  Socket
}