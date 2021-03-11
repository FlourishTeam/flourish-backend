const pool = require('../utils/pool');

module.exports = class CareLog {
  userPlantLogId;
  userId;
  plantId;
  userPlantId;
  careDate;
  careType;
  careNote;

  constructor(row) {
    this.userPlantLogId = row.user_plant_log_id;
    this.userId = row.user_id;
    this.plantId = row.plant_id;
    this.userPlantId = row.user_plant_id;
    this.careDate = row.care_date;
    this.careType = row.care_type;
    this.careNote = row.care_note;
  }

  static async insert({
    userId,
    plantId,
    userPlantId,
    careDate,
    careType,
    careNote,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO 
        users_plants_logs (
          user_id,
          plant_id,
          user_plant_id,  
          care_date, 
          care_type, 
          care_note)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [userId, plantId, userPlantId, careDate, careType, careNote]
    );
    return new CareLog(rows[0]);
  }

  static async findLogsByPlantId(plantId, userId) {
    const { rows } = await pool.query(
      `SELECT json_agg(users_plants_logs.*) AS care_logs
        FROM user_plants
        JOIN users_plants_logs
        ON users_plants_logs.user_plant_id=user_plants.user_plant_id
        WHERE users_plants_logs.user_id=$1
        AND users_plants_logs.plant_id=$2
        GROUP BY users_plants_logs.user_plant_id`,
      [plantId, userId]
    );

    if(!rows[0]) throw new Error(`No logs found for plant id of ${plantId}`);

    return {
      careLogs: rows[0].care_logs.map((log) => new CareLog(log)),
    };
  }

  static async deleteLogByLogId(userPlantLogId) {
    const { rows } = await pool.query(
      `DELETE FROM users_plants_logs 
        WHERE user_plant_log_id =$1
        RETURNING *`,
      [userPlantLogId]
    );

    return new CareLog(rows[0]);
  }
};
