const connection = require('../app/database')
class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `insert into avatar (filename, mimetype, size, user_id) values (?, ?, ?, ?)`
    const [res] = await connection.execute(statement, [filename, mimetype, size, userId])
    return res
  } 

  async getAvatarById(id) {
    const statement = `select * from avatar where user_id = ?`
    const [res] = await connection.execute(statement, [id])
    return res.pop()
  }

  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
    return result;
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService()
