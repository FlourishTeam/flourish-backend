const CareLog = require('../../models/Care_Log');
const UserPlant = require('../../models/UserPlant');

const addToCollection = (userId, plantId) => {
  return UserPlant.insert(userId, plantId);
};

// Look in to updating this method to pass in the plantId rather than the userPlantId.
const removeFromCollection = (userPlantId, userId) => {
  return UserPlant.delete(userPlantId, userId);
};

const getMyPlants = (userId) => {
  return UserPlant.find(userId);
};

// Check what is returning from this resolver: may need to edit the return statement in the findLogsByPlantId method
const getMyPlantById = (userPlantId) => {
  // Dee's Wednesday morning notes: because this resolver is just a regular-ass function, we can arbitrarily return whatever we want from it. It's totally possible to grab all plant data by id, then return all care logs data by id, and return it as a single object. The only thing that we'll need to change will be in the types declaration for this query.

  // We can camelCase the return from findLogsByPlantId to keep consistency.

  // Look in to updating this method to pass in the plantId rather than the userPlantId.
  return CareLog.findLogsByPlantId(userPlantId).then(console.log);
};

module.exports = {
  addToCollection,
  removeFromCollection,
  getMyPlants,
  getMyPlantById,
};
