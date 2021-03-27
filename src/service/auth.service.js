const connection = require('../app/database')
class AuthService {
  async checkResource (tableName, momentId, userId) {
    try {
      const statement = `select * from ${tableName} where id = ? and user_id = ?`
      const [res] = await connection.execute(statement, [momentId, userId])
      return res.length === 0 ? false : true
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new AuthService()