const pool = require("../utils/pool");

module.exports = class Plant {
  plantId;
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
    this.plantId = row.plant_id;
    this.image = row.image;
    this.commonName = row.common_name;
    this.synonyms = row.synonyms;
    this.scientificName = row.scientific_name;
    this.lightRange = row.light_range;
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
    propagation,
  }) {
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
          propagation 
          ,) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) 
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
      ]
    );

    return new Plant(rows[0]);
  }

  static async findById(plantId) {
    const { rows } = await pool.query(
      `SELECT 
          * 
        FROM plants
        WHERE plant_id=$1
        `,
      [plantId]
    );

    if (!rows[0]) throw new Error(`No plant found with id of ${plantId}`);

    return new Plant(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query("SELECT * FROM plants");

    return rows.map((row) => new Plant(row));
  }

  static async findByName(name) {
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM plants
      WHERE LOWER(common_name) LIKE '%${name}%'
      OR common_name LIKE '%${name}%'
      OR LOWER(scientific_name) LIKE '%${name}%'
      OR scientific_name LIKE '%${name}%'
      `
    );

    return rows.map((row) => new Plant(row));
  }
};
