import Sequelize from 'sequelize'
import sequelize from './orm.js'

export default sequelize.define('group', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  desc: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'group'
})