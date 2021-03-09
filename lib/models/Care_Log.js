const pool = require('../utils/pool');
const User = require('./User');
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
      [
        userId,
        plantId,
        userPlantId,
        plantNote,
        careDate,
        careNote,
      ]
    );
    return new CareLog(rows[0]);
  }

  
};
