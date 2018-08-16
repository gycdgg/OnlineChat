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
    ssl: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  }
}

export { databaseInfo }