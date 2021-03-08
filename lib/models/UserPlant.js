const pool = require('../utils/pool');
const User = require('./User');

module.exports = class UserPlant {
    userPlantId;
    userId;
    image;
    commonName;
    synonyms;
    scientificName;
    lightRange;
    hydrationRange;
    careDifficulty;
    pestsDiseases;
    warnings;
    height;
    spread;
    type;
    floweringPeriod;
    bloomSize;
    temperatureRange;
    placement;
    humidityLevel;
    substrateRecommendation;
    pottingNotes;
    watering;
    propagation;

    constructor(row) {
      this.userPlantId = row.user_plant_id; 
      this.image = row.image; 
      this.userId = row.user_id; 
      this.commonName = row.common_name; 
      this.synonyms = row.synonyms; 
      this.scientificName = row.scientific_name; 
      this.lightRange = row.light_rang; 
      this.hydrationRange = row.hydration_range; 
      this.careDifficulty = row.care_difficulty;
      this.pestsDiseases = row.pests_diseases;
      this.warnings = row.warnings; 
      this.height = row.height; 
      this.spread = row.spread; 
      this.type = row.type; 
      this.floweringPeriod = row.flowering_period; 
      this.bloomSize = row.bloom_size; 
      this.temperatureRange = row.temperature_range; 
      this.placement = row.placement; 
      this.humidityLevel = row.humidity_level; 
      this.substrateRecommendation = row.substrate_recommendation; 
      this.pottingNotes = row.potting_notes; 
      this.watering = row.watering; 
      this.propagation = row.propagation; 
    }

    static async insert({
      image,
      commonName,
      synonyms,
      scientificName,
      lightRange,
      hydrationRange,
      careDifficulty,
      pestsDiseases,
      warnings,
      height,
      spread,
      type,
      floweringPeriod,
      bloomSize,
      temperatureRange,
      placement,
      humidityLevel,
      substrateRecommendation,
      pottingNotes,
      watering,
      propagation 
    }, userId) {
      const { rows } = await pool.query(
        `INSERT INTO user_plants (     
          image,  
          common_name, 
          synonyms, 
          scientific_name, 
          light_rang, 
          hydration_range, 
          care_difficulty,
          pests_diseases,
          warnings, 
          height, 
          spread, 
          type, 
          flowering_period, 
          bloom_size, 
          temperature_range, 
          placement, 
          humidity_level, 
          substrate_recommendation, 
          potting_notes, 
          watering, 
          propagation,
          user_id, 
          ,) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) 
          RETURNING *`,
        [
          image,
          commonName,
          synonyms,
          scientificName,
          lightRange,
          hydrationRange,
          careDifficulty,
          pestsDiseases,
          warnings,
          height,
          spread,
          type,
          floweringPeriod,
          bloomSize,
          temperatureRange,
          placement,
          humidityLevel,
          substrateRecommendation,
          pottingNotes,
          watering,
          propagation,
          userId
        ]
      );

      return new UserPlant(rows[0]);
    }

    static async findById({ userPlantId }, userId) {
      const { rows } = await pool.query(
        `SELECT 
          * 
        FROM user_plants
        WHERE user_id=$1
        AND user_plant_id=$2
        ORDER BY user_plant_id
        `,
        [userId, userPlantId]
      );

      if(!rows[0]) throw new Error(`No plant found with user id of ${userId}`);

      return { 
        ...new UserPlant(rows[0]),
        users: rows[0].users.map(users => new User(users))
      };
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM user_plants');

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
