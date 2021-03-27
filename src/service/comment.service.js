const connection = require('../app/database')

class CommentService {
  async create (momentId, content, userId) {
    try {
      const statement = `insert into comment (content, moment_id, user_id) values (?, ?, ?)`
      const [res] = await connection.execute(statement, [content, momentId, userId])
      return res
    } catch (error) {
      console.log(error);
    }
  }

  async replay (momentId, content, userId, commentId) {
    try {
      const statement = `insert into comment (content, moment_id, user_id, comment_id) values (?, ?, ?, ?)`
      const [res] = await connection.execute(statement, [content, momentId, userId, commentId])
      return res
    } catch (error) {
      console.log(error);
    }
  }

  async update (commentId, content) {
    const statement = `update comment set content = ? where id = ?;`
    const [res] = await connection.execute(statement, [content, commentId])
    return res
  }
  async remove (commentId) {
    const statement = `delete from comment where id = ?;`
    const [res] = await connection.execute(statement, [commentId])
    return res
  }

  async list (momentId) {
    const statement = `
    SELECT 
    m.id, m.content, m.comment_id commendId, m.createAt createTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user
  FROM comment m
  LEFT JOIN user u ON u.id = m.user_id
  WHERE moment_id = ?;
    `
    const [res] = await connection.execute(statement, [momentId])
    return res
  }
}

module.exports = new CommentService()
