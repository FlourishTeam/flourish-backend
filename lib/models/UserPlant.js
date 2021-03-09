const pool = require('../utils/pool');
const User = require('./User');
const Plant = require('./Plant');

module.exports = class UserPlant {
  userPlantId;
  plantId;
  userId

  constructor(row) {
    this.userPlantId = row.user_plant_id;
    this.plantId = row.plant_id;
    this.userId = row.user_id;
  }

  static async insert(userId, plantId) {
    const { rows } = await pool.query(`
      INSERT INTO user_plants 
      (userId, plantId) 
      VALUES ($1, $2) 
      RETURNING *
      `,
    [userId, plantId]
    );

    return new UserPlant(rows[0]);
  }

  static async findById({ userPlantId }) {
    const { rows } = await pool.query(`
      SELECT 
      plants.*, user_plants.user_id
      FROM plants 
      JOIN user_plants
      ON user_plants.plant_id = plants.plant_id
      WHERE user_plants.user_id=$1
      `,
    [userPlantId]
    );

    if(!rows[0]) throw new Error(`No favorite plant found with id of ${userPlantId}`);

    return { 
      ...new UserPlant(rows[0])
    };
  }


  static async find() {
    const { rows } = await pool.query(`
    SELECT 
    common_name
    FROM plants 
    JOIN user_plants
    ON user_plants.plant_id = plants.plant_id
    WHERE user_plants.user_id=$1
    `);

    return rows.map(row => new UserPlant(row));
  }


  static async delete(userPlantId, userId) {
    const { rows } = await pool.query(
      `
        DELETE FROM user_plants 
        WHERE user_plant_id=$1 
        AND user_id=$2 
        RETURNING *
        `,
      [userPlantId, userId]
    );
  
    if(!rows[0]) throw new Error(`No plant found with the id of ${userPlantId}`);
        
    return new UserPlant(rows[0]);
  }
};
