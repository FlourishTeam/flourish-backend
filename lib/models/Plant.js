const pool = require('../utils/pool');
const User = require('./User');

module.exports = class Plant {
    id;
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
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
          RETURNING *`,
        [
          id,
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

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT 
          plants.*,
          array_to_json(array_agg(users.*)) AS users 
        FROM 
          plants
        JOIN users
        ON plants.id = users.plant_id
        WHERE plants.id=$1
        GROUP BY plants.id`,
        [id]
      );

      if(!rows[0]) throw new Error(`No plant found with the id of ${id}`);

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
      watering 
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
          watering, id
        ]
      );
  
      if(!rows[0]) throw new Error(`No plant found with the id of ${id}`);
        
      return new Plant(rows[0]);
    }


    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM plants WHERE id=$1 RETURNING *',
        [id]
      );
  
      if(!rows[0]) throw new Error(`No plant found with the id of ${id}`);
        
      return new Plant(rows[0]);
    }
};
