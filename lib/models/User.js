const pool = require('../utils/pool');

module.exports = class User {
    id;
    email;
    passwordHash;
    name;

    constructor(row) {
      this.id = row.id;
      this.email = row.email;
      this.passwordHash = row.password_hash;
      this.name = row.name;
    }

    static async insert({ email, passwordHash, name }) {
      const { rows } = await pool.query(`
        INSERT INTO users (email, password_hash, name) 
        VALUES ($1, $2, $3) 
        RETURNING  *;
        `, [email, passwordHash, name]
      );

      return new User(rows[0]);
    }

    static async findByEmail(email) {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email=$1'
        , [email]
      );

      if(!rows[0]) throw new Error(`No user with email ${email} found`);
      return new User(rows[0]);
    }

    toJSON() {
      const json = { ...this };
      delete json.passwordHash;
      return json;
    }
};
