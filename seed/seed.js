require('dotenv').config();
const pool = require('../lib/utils/pool');
const Data = require('./mock.json');

seedFunction();

async function seedFunction() {
  try {
    await Promise.all(Data.map(async seed => {
      await pool.query(`
      INSERT INTO plants
      (image,  
      common_name, 
      synonyms, 
      scientific_name, 
      light_range, 
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
      propagation) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      
      `, [
        seed.image,  
        seed.common_name, 
        seed.synonyms, 
        seed.scientific_name, 
        seed.light_range, 
        seed.hydration_range, 
        seed.care_difficulty,
        seed.pests_diseases,
        seed.warnings, 
        seed.height, 
        seed.spread, 
        seed.type, 
        seed.flowering_period, 
        seed.bloom_size, 
        seed.temperature_range, 
        seed.placement, 
        seed.humidity_level, 
        seed.substrate_recommendation, 
        seed.potting_notes, 
        seed.watering, 
        seed.propagation
      ]);
    }));
  }
  catch(err){
    console.log(err);
  }
  finally {
    pool.end();
  }
}
