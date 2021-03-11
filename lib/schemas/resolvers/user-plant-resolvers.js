const CareLog = require('../../models/CareLog');
<<<<<<< HEAD
=======
const Plant = require('../../models/Plant');
>>>>>>> 3401ca2176d68e74b81e6ee56110314945fde225
const UserPlant = require('../../models/UserPlant');

const addToCollection = (userId, plantId) => {
  return UserPlant.insert(userId, plantId);
};

const removeFromCollection = (plantId, userId) => {
  return UserPlant.delete(plantId, userId);
};

const getMyPlants = (userId) => {
  return UserPlant.find(userId);
};

const getMyCareHistoryById = async(plantId, userId) => {
  const { careLogs } = await CareLog.findLogsByPlantId(plantId, userId).then(
    (res) => res
  );

  const plantDetails = await Plant.findById(plantId).then((res) => res);

  return {
    careLogs: [...careLogs].map((log) => log),
    plantDetails: [plantDetails],
  };
};

const removeLogByLogId = (userPlantLogId) => {
  return CareLog.deleteLogByLogId(userPlantLogId)
    .then((res) => res);
};

module.exports = {
  addToCollection,
  removeFromCollection,
  getMyPlants,
  getMyCareHistoryById,
  removeLogByLogId
};
