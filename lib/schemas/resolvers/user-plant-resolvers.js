const UserPlant = require('../../models/UserPlant');

const addToCollection = (userId, plantId) => {
  return UserPlant.insert(userId, plantId);
};

const removeFromCollection = (userPlantId, userId) => {
  return UserPlant.delete(userPlantId, userId);
};

const getMyPlants = (userId) => {
  return UserPlant.find(userId);
};

module.exports = { addToCollection, removeFromCollection, getMyPlants };
