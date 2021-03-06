const databaseInfo = {
  databaseName: 'chat',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  underscored: true,
  timezone: '+08:00',
  dialectOptions: {
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true
  }
}

export { databaseInfo }