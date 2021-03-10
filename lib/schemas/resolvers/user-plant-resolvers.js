const CareLog = require('../../models/Care_Log');
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

// check what is returning from this resolver: may need to edit the return statement in the findLogsByPlantId method
const getMyPlantById = (userPlantId) => {
  return CareLog.findLogsByPlantId(userPlantId);
};

module.exports = {
  addToCollection,
  removeFromCollection,
  getMyPlants,
  getMyPlantById,
};
