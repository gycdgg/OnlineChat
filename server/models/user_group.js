import Sequelize from 'sequelize'
import sequelize from './orm.js'

export default sequelize.define('user_group', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  tableName: 'user_group'
})