const pool = require('../utils/pool');
const UserPlant = require('./UserPlant');

module.exports = class CareLog {
  userPlantLogId;
  userId;
  plantId;
  userPlantId;
  plantNote;
  careDate;
  careNote;

  constructor(row) {
    this.userPlantLogId = row.user_plant_log_id;
    this.userId = row.user_id;
    this.plantId = row.plant_id;
    this.userPlantId = row.user_plant_id;
    this.plantNote = row.plant_note;
    this.careDate = row.care_detail;
    this.careNote = row.care_note;
  }

  static async insert({
    userId,
    plantId,
    userPlantId,
    plantNote,
    careDate,
    careNote,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO 
        users_plants_logs (
          user_id,
          plant_id,
          user_plant_id, 
          plant_note, 
          care_date, 
          care_note)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [userId, plantId, userPlantId, plantNote, careDate, careNote]
    );
    return new CareLog(rows[0]);
  }

  static async findLogsByPlantId(user_plant_id) {
    const { rows } = await pool.query(
      `
      SELECT plants.*, json_agg(users_plants_logs) AS care_logs
      FROM plants 
      JOIN user_plants
      ON plants.plant_id = user_plants.plant_id
      JOIN users_plants_logs
      ON users_plants_logs.user_plant_id = user_plants.user_plant_id
      WHERE users_plants_logs.user_plant_id =$1
      GROUP BY users_plants_logs.user_plant_id, plants.plant_id
      `,
      [user_plant_id]
    );

    if (!rows[0])
      throw new Error(`No logs found for plant id of ${user_plant_id}`);

    return {
      ...new UserPlant(rows[0]),
      care_logs: rows[0].care_logs.map((log) => new CareLog(log)),
    };
  }

  static async deleteLogByLogId(id) {
    const {
      rows,
    } = await pool.query(
      'DELETE FROM users_plants_logs WHERE user_plant_log_id =$1  RETURNING *',
      [id]
    );

    return new CareLog(rows[0]);
  }
};
