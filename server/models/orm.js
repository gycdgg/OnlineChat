import Sequelize from 'sequelize'
import {
  databaseInfo
} from './database'

export default new Sequelize(databaseInfo.databaseName, databaseInfo.username, databaseInfo.password, {
  host: databaseInfo.host,
  dialect: databaseInfo.dialect,
  port: databaseInfo.port,
  underscored: databaseInfo.underscored,
  timezone: databaseInfo.timezone,
  dialectOptions: databaseInfo.dialectOptions
})