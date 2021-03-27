const connection = require('../app/database')
class UserService {
  async create (user) {
    // 将user存储到数据库中
    const { name, password } = user
    const statement = `insert into user (name, password) values (?, ?)`
    const res = await connection.execute(statement, [name, password])
    return res[0] 
  }

  async getUserByName(name) {
    const statement = `select * from user where name = ?`
    const res = await connection.execute(statement, [name]) 
    return res[0] 
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    console.log(userId);
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }

  async getUserInfoById(id) {
    const statement = `select name, avatar_url from user where id = ?`
    const [res] = await connection.execute(statement, [id])
    return res[0] 
  }
}

module.exports = new UserService()
