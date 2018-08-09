import Sequelize from 'sequelize'
import sequelize from './orm.js'

export default sequelize.define('socket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  _id: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  tableName: 'socket'
})