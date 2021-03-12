const pool = require('../utils/pool');

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
      `INSERT INTO user_plants (
          user_id, 
          plant_id) 
      VALUES ($1, $2) 
      RETURNING *`,
      [userId, plantId]
    );

    return new UserPlant(rows[0]);
  }

  static async findAllPlants(userId) {
    const { rows } = await pool.query(
      `SELECT 
          common_name, 
          plants.plant_id, 
          plants.scientific_name
        FROM plants 
        JOIN user_plants
        ON user_plants.plant_id = plants.plant_id
        WHERE user_plants.user_id=$1`,
      [userId]
    );

    return rows.map((row) => row);
  }

  static async find(userId, plantId) {
    const { rows } = await pool.query(
      `SELECT 
          common_name, 
          plants.plant_id, 
          plants.scientific_name
        FROM plants 
        JOIN user_plants
        ON user_plants.plant_id = plants.plant_id
        WHERE user_plants.user_id=$1
        AND user_plants.plant_id=$2`,
      [userId, plantId]
    );

    return rows.map((row) => row);
  }

  static async delete(plantId, userId) {
    const { rows } = await pool.query(
      `DELETE FROM user_plants
        WHERE user_id=$1
        AND plant_id=$2
        RETURNING *`,
      [userId, plantId]
    );

    if(!rows[0]) throw new Error(`No plant found with the id of ${plantId}`);

    return new UserPlant(rows[0]);
  }

  static async getUserPlantId(plantId, userId) {
    const { rows } = await pool.query(
      `SELECT 
          user_plant_id
        FROM user_plants
        WHERE user_plants.user_id=$1
        AND user_plants.plant_id=$2`,
      [plantId, userId]
    );

    return rows[0];
  }
};
