const connection = require('../app/database')

class labelService {
  async create (name) {
    const statement = `insert into label (name) values (?)`
    const [res] = await connection.execute(statement, [name])
    return res
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }

  async getLabels(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}
module.exports = new labelService()