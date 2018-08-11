import Sequelize from 'sequelize'
import sequelize from './orm.js'

export default sequelize.define('friend', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'friend'
})