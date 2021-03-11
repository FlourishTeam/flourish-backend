const CareLog = require('../../models/CareLog');
const Plant = require('../../models/Plant');
const UserPlant = require('../../models/UserPlant');

const addToCollection = (userId, plantId) => {
  return UserPlant.insert(userId, plantId);
};

const removeFromCollection = (plantId, userId) => {
  return UserPlant.delete(plantId, userId);
};

const getMyPlants = async(userId) => {
  const plants = await UserPlant.find(userId).then((res) => res);

  return [...plants].map((plant) => ({
    commonName: plant.common_name,
    plantId: plant.plant_id,
  }));
};

const getMyCareHistoryById = async(plantId, userId) => {
  const { careLogs = [] } = await CareLog.findLogsByPlantId(
    plantId,
    userId
  ).then((res) => res);

  const plantDetails = await Plant.findById(plantId).then((res) => res);
  return {
    careLogs: [...careLogs].map((log) => log),
    plantDetails: [plantDetails],
  };
};

const addLogById = ({ plantId, userId, user_plant_id, care_date, care_type, care_note }) => {
  return CareLog.insert(
    plantId, 
    userId, 
    user_plant_id, 
    care_date, 
    care_type, 
    care_note)
    .then((res) => res);
};

const removeLogByLogId = (userPlantLogId) => {
  return CareLog.deleteLogByLogId(userPlantLogId).then((res) => res);
};

module.exports = {
  addToCollection,
  removeFromCollection,
  getMyPlants,
  getMyCareHistoryById,
  addLogById,
  removeLogByLogId,
};
