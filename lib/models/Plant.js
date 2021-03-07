const pool = require('../utils/pool');
const User = require('./User');

module.exports = class Plant {
    id;
    userId;
    commonName;
    scientificName;
    lightRang;
    hydrationRange;
    careDifficulty;
    temperatureRange;
    placement;
    humidityLevel;
    substrateRecommendation;
    pottingNotes;
    watering;

    constructor(row) {
      this.id = row.id; 
      this.userId = row.user_id; 
      this.commonName = row.common_name; 
      this.scientificName = row.scientific_name; 
      this.lightRang = row.light_rang; 
      this.hydrationRange = row.hydration_range; 
      this.careDifficulty = row.care_difficulty; 
      this.temperatureRange = row.temperature_range; 
      this.placement = row.placement; 
      this.humidityLevel = row.humidity_level; 
      this.substrateRecommendation = row.substrate_recommendation; 
      this.pottingNotes = row.potting_notes; 
      this.watering = row.watering; 
    }

    static async insert({     
      id,
      userId,
      commonName,
      scientificName,
      lightRang,
      hydrationRange,
      careDifficulty,
      temperatureRange,
      placement,
      humidityLevel,
      substrateRecommendation,
      pottingNotes,
      watering, 
    }) {
      const { rows } = await pool.query(
        `INSERT INTO plants (
          user_id,      
          common_name, 
          scientific_name, 
          light_rang, 
          hydration_range, 
          care_difficulty, 
          temperature_range, 
          placement, 
          humidity_level, 
          substrate_recommendation, 
          potting_notes, 
          watering
          ,) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
          RETURNING *`,
        [
          id,
          userId,
          commonName,
          scientificName,
          lightRang,
          hydrationRange,
          careDifficulty,
          temperatureRange,
          placement,
          humidityLevel,
          substrateRecommendation,
          pottingNotes,
          watering
        ]
      );

      return new Plant(rows[0]);
    }

    static async findById(userId) {
      const { rows } = await pool.query(
        `SELECT 
          * 
        FROM plants
        WHERE user_id=$1
        ORDER BY plants.id
        `,
        [userId]
      );

      if(!rows[0]) throw new Error(`No plant found with user id of ${userId}`);

      return { 
        ...new Plant(rows[0]),
        users: rows[0].users.map(users => new User(users))
      };
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM plants');

      return rows.map(row => new Plant(row));
    }
    
    static async update(id, {   
      commonName,
      scientificName,
      lightRang,
      hydrationRange,
      careDifficulty,
      temperatureRange,
      placement,
      humidityLevel,
      substrateRecommendation,
      pottingNotes,
      watering,
      userId,  
    }) {
      const { rows } = await pool.query(
        `UPDATE plans
          SET 
          common_name=$1 
          scientific_name=$2 
          light_rang=$3
          hydration_range=$4 
          care_difficulty=$5 
          temperature_range=$6 
          placement=$7
          humidity_level=$8 
          substrate_recommendation=$9
          potting_notes=$10
          watering=$11
            WHERE id=$12
            AND user_id=$13
            RETURNING *
          `,
        [
          commonName,
          scientificName,
          lightRang,
          hydrationRange,
          careDifficulty,
          temperatureRange,
          placement,
          humidityLevel,
          substrateRecommendation,
          pottingNotes,
          watering, 
          id,
          userId
        ]
      );
  
      if(!rows[0]) throw new Error(`No plant found with the id of ${id}`);
        
      return new Plant(rows[0]);
    }


    static async delete(id, userId) {
      const { rows } = await pool.query(
        `
        DELETE FROM plants 
        WHERE id=$1 
        AND user_id=$2 
        RETURNING *
        `,
        [id, userId]
      );
  
      if(!rows[0]) throw new Error(`No plant found with the id of ${id}`);
        
      return new Plant(rows[0]);
    }
};
