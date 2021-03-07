const pool = require('../utils/pool');
const User = require('./User');
const UserPlant = require('./UserPlant');

module.exports = class CareLog {
  userPlantLogId;
  userId;
  userPlantId;
  image;
  commonName;
  synonyms;
  scientificName;
  lightRang;
  hydrationRange;
  careDifficulty;
  temperatureRange;
  pestsDiseases;
  warnings;
  height;
  spread;
  type;
  floweringPeriod;
  bloomSize;
  placement;
  humidityLevel;
  substrateRecommendation;
  pottingNotes;
  watering;
  propagation;
  plantNote;
  careDate;
  careNote;

  constructor(row) {
    this.userPlantLogId = row.user_plant_log_id; 
    this.userId = row.user_id;
    this.userPlantId = row.user_plant_id;
    this.image = row.image; 
    this.commonName = row.common_name; 
    this.synonyms = row.synonyms;
    this.scientificName = row.scientific_name; 
    this.lightRang = row.light_rang; 
    this.hydrationRange = row.hydration_range; 
    this.careDifficulty = row.care_difficulty; 
    this.temperatureRange = row.temperature_range; 
    this.pestsDiseases = row.pests_diseases;
    this.warnings = row.warnings;
    this.height = row.height;
    this.spread = row.spread;
    this.type = row.type;
    this.floweringPeriod = row.flowering_period;
    this.bloomSize = row.bloom_size;
    this.placement = row.placement; 
    this.humidityLevel = row.humidity_level; 
    this.substrateRecommendation = row.substrate_recommendation; 
    this.pottingNotes = row.potting_notes; 
    this.watering = row.watering; 
    this.propagation = row.propagation;
    this.plantNote = row.plant_note;
    this.careDate = row.care_detail;
    this.careNote = row.care_note;
  }

  static async insert({
    userPlantLogId,
    userId,
    userPlantId,
    image,
    commonName,
    synonyms,
    scientificName,
    lightRang,
    hydrationRange,
    careDifficulty,
    temperatureRange,
    pestsDiseases,
    warnings,
    height,
    spread,
    type,
    floweringPeriod,
    bloomSize,
    placement,
    humidityLevel,
    substrateRecommendation,
    pottingNotes,
    watering,
    propagation,
    plantNote,
    careDate,
    careNote,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO users_plants_logs (
        user_plant_log_id, 
        user_id,
        user_plant_id,
        image,
        common_name, 
        synonyms,
        scientific_name, 
        light_rang, 
        hydration_range, 
        care_difficulty, 
        temperature_range, 
        pests_diseases,
        warnings,
        height,
        spread,
        type,
        flowering_period,
        bloom_size,
        placement, 
        humidity_level, 
        substrate_recommendation, 
        potting_notes, 
        watering,
        plant_note,
        care_date,
        care_note,
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
      RETURNING *`,
      [
        userPlantLogId,
        userId,
        userPlantId,
        image,
        commonName,
        synonyms,
        scientificName,
        lightRang,
        hydrationRange,
        careDifficulty,
        temperatureRange,
        pestsDiseases,
        warnings,
        height,
        spread,
        type,
        floweringPeriod,
        bloomSize,
        placement,
        humidityLevel,
        substrateRecommendation,
        pottingNotes,
        watering,
        propagation,
        plantNote,
        careDate,
        careNote,
      ]
    );
    return new CareLog(rows[0])
  }
}
