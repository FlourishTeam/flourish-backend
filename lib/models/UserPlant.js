const pool = require('../utils/pool');
const CareLog = require('./Care_Log');

module.exports = class UserPlant {
  userPlantId;
  plantId;
  userId;

  constructor(row) {
    this.userPlantId = row.user_plant_id;
    this.plantId = row.plant_id;
    this.userId = row.user_id;
  }

  static async insert(userId, plantId) {
    const { rows } = await pool.query(
      `
      INSERT INTO user_plants 
      (user_id, plant_id) 
      VALUES ($1, $2) 
      RETURNING *
      `,
      [userId, plantId]
    );

    return new UserPlant(rows[0]);
  }

  static async findById({ userPlantId }) {
    const { rows } = await pool.query(
      `
    SELECT plants.*, json_agg(users_plants_logs) AS care_logs
    FROM plants 
    JOIN user_plants
    ON plants.plant_id = user_plants.plant_id
    JOIN users_plants_logs
    ON users_plants_logs.user_plant_id = user_plants.user_plant_id
    WHERE users_plants_logs.user_plant_id=$1
    GROUP BY users_plants_logs.user_plant_id, plants.plant_id,
    `,
      [userPlantId]
    );

    if (!rows[0])
      throw new Error(`No favorite plant found with id of ${userPlantId}`);

    return {
      ...new UserPlant(rows[0]),
      care_logs: rows[0].care_logs.map((log) => new CareLog(log)),
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

    return rows.map((row) => new UserPlant(row));
  }

  static async delete(userPlantId, userId) {
    const { rows } = await pool.query(
      `
      DELETE FROM user_plants
      WHERE user_id=$1
      AND user_plant_id=$2
      RETURNING *
        `,
      [userId, userPlantId]
    );

    if (!rows[0])
      throw new Error(`No plant found with the id of ${userPlantId}`);

    return new UserPlant(rows[0]);
  }
};
