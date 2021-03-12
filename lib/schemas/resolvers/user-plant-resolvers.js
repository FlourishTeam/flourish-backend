const CareLog = require('../../models/CareLog');
const Plant = require('../../models/Plant');
const UserPlant = require('../../models/UserPlant');

// addToCollection adds a plant to a user's collection by userId and plantId
const addToCollection = (userId, plantId) => {
  return UserPlant.insert(userId, plantId);
};

// removeFromCollection removes a plant to a user's collection by userId and plantId
const removeFromCollection = (plantId, userId) => {
  return UserPlant.delete(plantId, userId);
};

// getMyPlants grabs all plants belonging to a user and returns each plant's common name, scientific name, and plantId
const getMyPlants = async(userId) => {
  const plants = await UserPlant.findAllPlants(userId);

  return [...plants].map((plant) => ({
    commonName: plant.common_name,
    scientificName: plant.scientific_name,
    plantId: plant.plant_id,
  }));
};

// getMyCareHistoryById gets all data required for our frontend's plant care history page: the history of care, all of the plant's details, and the userPlantId (used in another query)
const getMyCareHistoryById = async(plantId, userId) => {
  const { careLogs = [] } = await CareLog.findLogsByPlantId(plantId, userId);
  const plantDetails = await Plant.findById(userId, plantId);

  const userPlantId = await UserPlant.getUserPlantId(plantId, userId).then(
    (res) => res.user_plant_id
  );

  return {
    careLogs: [...careLogs].map((log) => log),
    plantDetails: [plantDetails],
    userPlantId,
  };
};

// addLogById adds a new care log associated with a particular plant
const addLogById = (
  plantId,
  userId,
  userPlantId,
  careDate,
  careType,
  careNote
) => {
  return CareLog.insert(
    plantId,
    userId,
    userPlantId,
    careDate,
    careType,
    careNote
  ).then((res) => res);
};

// removeLogByLogId removes a care log associated with a particular plant
const removeLogByLogId = (userPlantLogId) => {
  return CareLog.deleteLogByLogId(userPlantLogId);
};

module.exports = {
  addToCollection,
  removeFromCollection,
  getMyPlants,
  getMyCareHistoryById,
  addLogById,
  removeLogByLogId,
};
