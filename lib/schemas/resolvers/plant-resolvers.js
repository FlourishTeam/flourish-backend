const { image_search } = require('duckduckgo-images-api');
const Plant = require('../../models/Plant');

// imageScraper grabs an image by name
const imageScraper = (query) => {
  return image_search({
    query,
    moderate: true,
  }).then((res) => {
    return res[0]?.thumbnail;
  });
};

// getPlantByName grabs a plant from our database by name pattern using SQL's LIKE operator
const getPlantByName = (name) => {
  return Plant.findByName(name);
};

// getPlantById grabs a plant from our database by its plantId
const getPlantById = (id) => {
  return Plant.findById(id);
};

module.exports = {
  imageScraper,
  getPlantByName,
  getPlantById,
};
