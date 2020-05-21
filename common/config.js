let dbPwd = null
const DB_USERNAME = ''
const CLUSTER = ''
const DB_NAME = ''
const REMOTE_NET = ''

process.argv.forEach(arg => {
  if (/DB_PWD=/.test(arg)) {
    dbPwd = arg.match(/DB_PWD=([\w\W]*)/)[1]
  }
})

if (!dbPwd) {
  throw 'Please input your database password. (DB_PWD)'
}

module.exports = {
  DB_URL: `mongodb+srv://${DB_USERNAME}:${dbPwd}@${CLUSTER}-${REMOTE_NET}/${DB_NAME}?retryWrites=true&w=majority`,
  JWT_SECRET: 'jwt-secret'
}
